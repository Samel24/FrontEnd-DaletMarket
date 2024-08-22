import React, { useContext, useEffect, useState } from "react";
import { Contexto } from "../../context/Contexto";
import formValidation from "../../validations/formValidation";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";
import { useNavigate } from "react-router-dom";
import paths from "../../config/routePaths";

export default function LoginForm() {
  const navigate = useNavigate();

  const { peticionPost, setToken, setUser } = useContext(Contexto);

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  // Detectar el valor del input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Funcion para registrar usuario
  const handleCreate = async () => {
    const validate = await validation();
    if (validate) return alertInfo(validate);
    let respuesta = await peticionPost(
      "http://localhost:3000/users/registrar",
      "POST",
      values
    );
    setValues({
      username: "",
      password: "",
    });
    if (respuesta.status === 201) {
      return alertConfirm("Se ha registrado el usuario exitosamente");
    } else {
      return alertError("No se ha registrado el usuario");
    }
  };

  // funcion para validar campos
  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  // Funcion de iniciar sesion
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) return alertInfo(validate);
    let respuesta = await peticionPost(
      "http://localhost:3000/users/login",
      "POST",
      values
    );
    setValues({
      username: "",
      password: "",
    });
    if (respuesta.status === 200) {
      setToken(respuesta.token);
      setUser(respuesta.user)
      alertConfirm("Has iniciado sesion exitosamente");
      return navigate(paths.SOTER_PATH);
    } else {
      return alertError("No coinciden las credenciales");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="gap-4 w-[75%] flex flex-col justify-center items-center"
      >
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleInputChange}
          className="border-2 rounded-lg bg-white border-azul bg-transparent focus:outline-none w-full px-2 py-1 font-breeSerif text-md"
          placeholder="Usuario"
        />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
          className="border-2 rounded-lg bg-white border-azul bg-transparent focus:outline-none w-full px-2 py-1 font-breeSerif text-md"
          placeholder="Contraseña"
        />
        <div className="flex flex-col md:flex-row gap-4 justify-start w-full mt-4">
          <button className="bg-azul font-breeSerif text-lg rounded-lg p-2 text-blanco hover:bg-naranja transition-all duration-300">
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={e => {navigate(paths.REGISTER_PATH)}}
            className="bg-azul font-breeSerif text-lg rounded-lg p-2 text-blanco hover:bg-naranja transition-all duration-300"
          >
            Registrarme
          </button>
        </div>
      </form>
    </>
  );
}
