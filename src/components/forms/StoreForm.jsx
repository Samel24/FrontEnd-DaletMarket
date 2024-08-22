import React, { useContext, useEffect, useState } from "react";
import { Contexto } from "../../context/Contexto";
import formValidation from "../../validations/formValidation";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";

export default function StoreForm({ setModal, producto }) {
  const { peticionPostToken, setStore, store } = useContext(Contexto);

  const [values, setValues] = useState({
    nombre: producto ? producto.nombre : "",
    categoria: producto ? producto.categoria : "Tecnologia",
    descripcion: producto ? producto.descripcion : "",
    precio: producto ? producto.precio : "",
    moneda: producto ? producto.moneda : "",
    imagen: producto ? producto.imagen : "",
    cantidad: producto ? producto.cantidad : "",
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
  const validation = async () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  // Funcion de iniciar sesion
  const handleSubmit = async (e) => {
    e.preventDefault();
    let respuesta = '';
    const validate = await validation();
    if (validate) return alertInfo(validate);
    if (producto === null) {
      respuesta = await peticionPostToken(
        "http://localhost:3000/productos/registrar",
        "POST",
        values
      );
      if (respuesta.status === 201) {
        setStore([
          // con el nuevo _array_
          ...store, // el cual contiene todos los elementos antiguos
          respuesta.producto, // y un nuevo elemento al final
        ]);
        alertConfirm(respuesta.mensaje);
      } else {
        alertError("No se ha registrado el producto");
      }
    } else {
      respuesta = await peticionPostToken(
        `http://localhost:3000/productos/editar/${producto._id}`,
        "PUT",
        values
      );
      if (respuesta.status === 201) {
        const nuevoStore = store.map((c, i) => {
          if (c._id === producto._id) {
            // actualizo el producto
            return c = {
              _id: producto._id,
              nombre: values.nombre,
              categoria: values.categoria,
              descripcion: values.descripcion,
              precio: values.precio,
              moneda: values.moneda,
              imagen: values.imagen,
              cantidad: values.cantidad,
            };
          } else {
            // El resto no ha cambiado
            return c;
          }
        });
        setStore(nuevoStore);
        alertConfirm(respuesta.mensaje);
      } else {
        alertError("No se ha editado el cambio en el store");
      }
    }
    setValues({
      nombre: "",
      categoria: "",
      descripcion: "",
      precio: "",
      moneda: "",
      imagen: "",
      cantidad: "",
    });
    
    setModal(false);

  };

  return (
    <>
      <div
        id="modal"
        class="fixed top-0 left-0 bg-opacity-40 bg-negro w-[100vw] h-[100vh] flex items-center justify-center"
      >
        <div class="w-[90%] h-[80%] md:w-[80%] md:h-[60%] bg-blanco border-naranja border-[3px] rounded-3xl">
          <form
            onSubmit={handleSubmit}
            class="flex flex-col justify-center items-center gap-4 h-full w-full p-4"
          >
            <h4 class="font-lato font-bold text-3xl mb-8 text-negro">
              Registrar Producto
            </h4>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={values.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              class="border-[2px] border-azul rounded-lg bg-white focus:outline-none w-full lg:w-2/3 px-2 py-1 font-breeSerif text-md"
            />
            <select
              name="categoria"
              id="categoria"
              value={values.categoria}
              onChange={handleInputChange}
              class="border-[2px] border-azul rounded-lg bg-white focus:outline-none w-full lg:w-2/3 px-2 py-1 font-breeSerif text-md"
            >
              <option value="Tecnologia">Tecnologia</option>
              <option value="Ropa">Ropa</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Electrodomesticos">Electrodomesticos</option>
              <option value="Comida">Comida</option>
              <option value="Videojuegos">Videojuegos</option>
              <option value="Vehiculos">Vehiculos</option>
              <option value="Servicios">Servicios</option>
              <option value="Belleza">Belleza</option>
            </select>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              value={values.descripcion}
              onChange={handleInputChange}
              placeholder="Descripcion"
              class="border-[2px] border-azul rounded-lg bg-white focus:outline-none w-full lg:w-2/3 px-2 py-1 font-breeSerif text-md"
            />
            <div class="flex flex-col md:flex-row gap-4 w-full lg:w-2/3">
              <input
                type="number"
                min="0"
                name="precio"
                id="precio"
                value={values.precio}
                onChange={handleInputChange}
                placeholder="Precio"
                class="border-[2px] border-azul rounded-lg bg-white focus:outline-none w-full lg:w-2/3 px-2 py-1 font-breeSerif text-md"
              />
              <input
                type="text"
                name="moneda"
                id="moneda"
                value={values.moneda}
                onChange={handleInputChange}
                placeholder="Moneda"
                class="border-[2px] border-azul rounded-lg bg-white focus:outline-none w-full lg:w-2/3 px-2 py-1 font-breeSerif text-md"
              />
            </div>
            <input
              type="text"
              name="imagen"
              id="imagen"
              onChange={handleInputChange}
              value={values.imagen}
              placeholder="Url de la Imagen"
              class="border-[2px] border-azul rounded-lg bg-white focus:outline-none w-full lg:w-2/3 px-2 py-1 font-breeSerif text-md"
            />
            <input
              type="number"
              min={0}
              name="cantidad"
              id="cantidad"
              onChange={handleInputChange}
              value={values.cantidad}
              placeholder="Cantidad"
              class="border-[2px] border-azul rounded-lg bg-white focus:outline-none w-full lg:w-2/3 px-2 py-1 font-breeSerif text-md"
            />
            <div class="w-full lg:w-2/3 flex justify-end gap-4 mt-4">
              <button
                type="button"
                class="bg-azul p-2 rounded-xl font-breeSerif text-blanco"
                onClick={(e) => setModal(false)}
              >
                Regresar
              </button>
              <button
                type="submit"
                class="bg-azul p-2 rounded-xl font-breeSerif text-blanco"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
