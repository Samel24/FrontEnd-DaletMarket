import { useContext, useState } from "react";
import { Contexto } from "../../context/Contexto";
import formValidation from "../../validations/formValidation";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";

function PerfilForm() {

  const { peticionPost, user, setUser } = useContext(Contexto);

  const [values, setValues] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    correo: user.correo,
    username: user.username,
    password: "",
    confirmPassword: "",
  });

  // Detectar el valor del input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
    const validate = await validation();
    if (validate) return alertInfo(validate);
    let errorPassword = formValidation.validatePasswords(
      values.password,
      values.confirmPassword
    );
    if (!errorPassword) return alertError("No coinciden las contraseñas");
    let respuesta = await peticionPost(
      `http://localhost:3000/users/editar/${user._id}`,
      "PUT",
      values
    );
    if (respuesta.status === 201) {
        setUser({
            ...user, // Copia otros campos
            nombre: respuesta.usuario.nombre,
            apellido: respuesta.usuario.apellido,
            correo: respuesta.usuario.correo,
          });
      return alertConfirm(respuesta.mensaje);
    } else {
      return alertError(respuesta.error);
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
          name="nombre"
          value={values.nombre}
          onChange={handleInputChange}
          className="border-2 rounded-lg bg-white border-azul bg-transparent focus:outline-none w-full px-2 py-1 font-breeSerif text-md"
          placeholder="Nombre"
        />
        <input
          type="text"
          name="apellido"
          value={values.apellido}
          onChange={handleInputChange}
          className="border-2 rounded-lg bg-white border-azul bg-transparent focus:outline-none w-full px-2 py-1 font-breeSerif text-md"
          placeholder="Apellido"
        />
        <input
          type="email"
          name="correo"
          value={values.correo}
          onChange={handleInputChange}
          className="border-2 rounded-lg bg-white border-azul bg-transparent focus:outline-none w-full px-2 py-1 font-breeSerif text-md"
          placeholder="Correo"
        />
        <input
          type="text"
          name="username"
          value={values.username}
          disabled
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
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
          className="border-2 rounded-lg bg-white border-azul bg-transparent focus:outline-none w-full px-2 py-1 font-breeSerif text-md"
          placeholder="Confirmar Contraseña"
        />
        <div className="flex flex-col md:flex-row gap-4 justify-start w-full mt-4">
          <button className="bg-azul font-breeSerif text-lg rounded-lg p-2 text-blanco hover:bg-naranja transition-all duration-300">
            Editar Perfil
          </button>
        </div>
      </form>
    </>
  );
}

export default PerfilForm;
