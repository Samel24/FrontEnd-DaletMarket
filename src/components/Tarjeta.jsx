import { useContext, useState } from "react";
import logo from "../assets/Logo Dalet Market.jpg";
import { Contexto } from "../context/Contexto";
import { alertConfirm, alertError } from "./alerts/alerts";

function Tarjeta({ item, setModal, setCurrentItem }) {
  const { peticionPostToken, store, setStore, user, fav, peticionGet } = useContext(Contexto);

  const handleDelete = async () => {
    let respuesta = await peticionPostToken(
      `http://localhost:3000/productos/delete/${item._id}`,
      "DELETE",
      {}
    );
    if (respuesta.status === 200) {
      setStore(store.filter((a) => a._id !== item._id));
      return alertConfirm(respuesta.mensaje);
    }
  };

  const handleSell = async (e) => {
    let respuesta = await peticionPostToken(
      `http://localhost:3000/productos/vender/${item._id}`,
      "PUT",
      {}
    );
    if (respuesta.status === 201) {
      const nuevoStore = store.map((c, i) => {
        if (c._id === item._id) {
          // actualizo el producto
          return (c = {
            _id: item._id,
            nombre: item.nombre,
            categoria: item.categoria,
            descripcion: item.descripcion,
            precio: item.precio,
            moneda: item.moneda,
            imagen: item.imagen,
            cantidad: item.cantidad - 1,
          });
        } else {
          // El resto no ha cambiado
          return c;
        }
      });
      setStore(nuevoStore)
      return alertConfirm(respuesta.mensaje);
    }
  };

  const handleFavorite = async (e) => {
    let respuesta = await peticionPostToken(
      `http://localhost:3000/favoritos/registrar/${user.username}/${item._id}`,
      "POST",
      {}
    );
    if (respuesta.status === 200) {
      alertConfirm(respuesta.mensaje);
      if (fav) {
        let respuesta2 = await peticionGet(
          "http://localhost:3000/favoritos/all",
          "GET"
        );
        if (respuesta2.status === 200) {
          let nuevoStore = [];
          respuesta2.favoritos.forEach((favorito) => {
            store.forEach((item) => {
              if (
                favorito.producto === item._id &&
                favorito.username === user.username
              ) {
                nuevoStore.push(item);
              }
            });
          });
          return setStore(nuevoStore);
        }
      }
      return 
    }
    return alertError("Algo Fallo")
  }

  return (
    <>
      <div className=" max-w-sm bg-blanco border-2 border-naranja rounded-xl w-[100%] md:w-[40%] lg:w-[30%] max-h-[650px] min-h-[550px] ">
        <img
          className="rounded-t-lg border-b-2 border-naranja max-h-[300px] w-full"
          src={item.imagen}
          alt="product image"
        />
        <div className="px-5 pb-5 pt-5 flex flex-col gap-4">
          <h3 className="text-xl font-breeSerif font-bold text-center">
            {item.nombre}
          </h3>
          <h5 className="font-breeSerif text-negro text-md">{item.descripcion}</h5>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-lato font-bold text-negro">
              {item.precio}
              {item.moneda}
            </span>
          </div>
          <h5 className="font-breeSerif text-negro text-md">
            {item.cantidad} Disponibles
          </h5>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleSell}
              className="border-2 border-azul rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-azul transition-all duration-500"
            >
              Vender
            </button>
            <button
              className="border-2 border-azul rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-azul transition-all duration-500"
              onClick={handleFavorite}
            >
              Favorito
            </button>
            {user.rol === "admin" ? (
              <>
                <button
                  className="border-2 border-rojasio rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-rojasio transition-all duration-500"
                  onClick={(e) => {
                    setCurrentItem(item);
                    setModal(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="border-2 border-red-600 rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-red-600 transition-all duration-500"
                  onClick={(e) => handleDelete()}
                >
                  Eliminar
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tarjeta;
