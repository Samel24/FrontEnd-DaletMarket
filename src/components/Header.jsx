import { useContext, useState } from "react";
import logo from "../assets/Logo Dalet Market.jpg";
import { useNavigate } from "react-router-dom";
import paths from "../config/routePaths";
import { alertConfirm, alertInfo } from "./alerts/alerts";
import { Contexto } from "../context/Contexto";
import formValidation from "../validations/formValidation";

function Header() {
  const navigate = useNavigate();

  const [side, setSide] = useState(false);
  const [values, setValues] = useState({
    search: ""
  });

  const { setToken, setUser, setStore, peticionGet } = useContext(Contexto);

  const logout = async () => {
    await setToken(null);
    await setUser(null);
    alertConfirm("Has cerrado sesion exitosamente");
    return navigate(paths.LOGIN_PATH);
  };

  // Detectar el valor del input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // funcion para validar campos
  const validation = async () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

   // Funcion de buscar
   const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await validation();
    if (validate) return alertInfo(validate);
    let respuesta = await peticionGet(
      `http://localhost:3000/productos/buscar/${values.search}`,
      "GET"
    );
    if (respuesta.status === 200) {
      alertConfirm("Resultado de la busqueda")
      return setStore(respuesta.productos);
    }
  };

  return (
    <>
      <header className="fixed w-full h-[80px] flex items-center p-4 bg-blanco">
        <h1 className="text-3xl text-naranja font-lato font-bold">
          <b className="text-azul">D</b>alet<b className="text-azul">M</b>arket
        </h1>
        <div className="w-full flex justify-end md:invisible">
          <img
            onClick={(e) => setSide(true)}
            className="h-[50px] w-[50px] rounded-full border-2 border-naranja hover:cursor-pointer"
            src={logo}
            id="toggle-btn"
            alt="logo"
          />
        </div>
        <nav
          id="sidebar"
          className={
            side
              ? "h-[600px] flex justify-center items-center md:relative md:h-full md:-right-0 absolute top-0 right-0 w-2/3 bg-blanco transition-all duration-500"
              : "h-[600px] flex justify-center items-center md:relative md:h-full md:-right-0 absolute top-0 -right-full w-2/3 bg-blanco transition-all duration-500"
          }
        >
          <ul className="flex flex-col md:w-full md:flex-row items-center justify-center gap-4">
            <li
              onClick={(e) => setSide(false)}
              className="font-breeSerif text-lg text-naranja md:invisible"
            >
              Cerrar
            </li>
            <li
              className="font-breeSerif text-sm md:text-lg hover:cursor-pointer text-negro hover:text-red-600 transition-all duration-500"
              onClick={(e) => logout()}
            >
              Logout
            </li>
            <li className="font-breeSerif text-sm md:text-lg hover:cursor-pointer text-negro hover:text-azul transition-all duration-500">
              <a onClick={e => {navigate(paths.SOTER_PATH)}}>Tienda</a>
            </li>
            <li className="font-breeSerif text-sm md:text-lg hover:cursor-pointer text-negro hover:text-azul transition-all duration-500">
              <a onClick={e => {navigate(paths.PERFIL_PATH)}}>Perfil</a>
            </li>
            <li className="font-breeSerif text-sm md:text-lg hover:cursor-pointer text-negro hover:text-azul transition-all duration-500">
              <a onClick={e => {navigate(paths.FAVORITOS_PATH)}}>Favoritos</a>
            </li>
            <li className="font-breeSerif text-sm md:text-lg hover:cursor-pointer text-negro hover:text-azul transition-all duration-500">
              <a href="https://github.com/Samel24">Contacto</a>
            </li>
            <form onSubmit={handleSubmit} className="w-full justify-center items-center flex md:w-[300px] px-4 gap-2">
              <input
                onChange={handleInputChange}
                type="text"
                id="search"
                name="search"
                value={values.search}
                placeholder="Buscar..."
                className="px-4 py-2 rounded-3xl border-2 border-naranja focus:outline-none w-2/3 md:w-full text-sm md:text-lg font-breeSerif"
              />
              <button
                type="submit"
                className="bg-azul p-2 text-blanco font-breeSerif rounded-3xl border-2 border-azul hover:border-naranja hover:bg-naranja transition-all duration-500"
              >
                Search
              </button>
            </form>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
