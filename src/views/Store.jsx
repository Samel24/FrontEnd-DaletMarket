import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import StoreForm from "../components/forms/StoreForm";
import { Contexto } from "../context/Contexto";
import Tarjeta from "../components/Tarjeta";
import { alertConfirm } from "../components/alerts/alerts";

const ITEMS_PER_PAGE = 10;

function Store() {
  const { store, setStore, peticionGet, user, setFav } = useContext(Contexto);

  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  const [filtrado, setFiltrado] = useState("Todos");
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const cargar = async () => {
      let respuesta = await peticionGet(
        "http://localhost:3000/productos/all",
        "GET"
      );
      if (respuesta.status === 200) {
        setFav(false);
        setProductos([...respuesta.productos].splice(0, ITEMS_PER_PAGE));
        return setStore(respuesta.productos);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      let respuesta = await peticionGet(
        "http://localhost:3000/productos/all",
        "GET"
      );
      if (respuesta.status === 200) {
        setProductos([...store].splice(0, ITEMS_PER_PAGE));
        setCurrentPage(0)
        return;
      }
      setFav(false);
    };
    cargar();
  }, [store]);

  const nextPage = (e) => {
    const totalElemntos = store.length;
    const nexPage = currentPage + 1;
    const firsItem = nexPage * ITEMS_PER_PAGE;
    if (firsItem >= totalElemntos) return;
    setProductos([...store].splice(firsItem, ITEMS_PER_PAGE));
    setCurrentPage(nexPage);
  };

  const previusPage = (e) => {
    const previusPage = currentPage - 1;
    const firsItem = previusPage * ITEMS_PER_PAGE;
    if (firsItem < 0) return;
    setProductos([...store].splice(firsItem, ITEMS_PER_PAGE));
    setCurrentPage(previusPage);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (value === "Todos") {
      let respuesta = await peticionGet(
        "http://localhost:3000/productos/all",
        "GET"
      );
      if (respuesta.status === 200) {
        alertConfirm("Filtrado con exito en la categoria global");
        return setStore(respuesta.productos);
      }
    } else {
      let respuesta = await peticionGet(
        `http://localhost:3000/productos/filtro/${value}`,
        "GET"
      );
      if (respuesta.status === 200) {
        alertConfirm("Filtrado con exito en la categoria " + value);
        return setStore(respuesta.productos);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="w-full h-auto py-8 px-4 lg:p-8 min-h-[100vh]">
        <div className="h-[80px]" id="productos-disponibles"></div>
        <h2 className="text-2xl font-lato text-negro mb-8">
          Productos Disponibles (<i id="cantidad">{store.length}</i>)
        </h2>
        <div className="flex flex-col md:flex-row">
          <section className="w-[100%] h-auto md:w-[20%] md:border-r-[3px] md:border-naranja md:p-4 md:fixed">
            <h3 className="text-xl font-breeSerif font-bold mb-8">
              Categorias:
            </h3>
            <ul className="flex md:flex-col flex-wrap gap-4 pb-8 md:gap-2 md:border-b-[3px] md:pl-4 md:pb-8 md:border-naranja">
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  id="todos"
                  name="filtrado"
                  onClick={handleChange}
                  value="Todos"
                />
                Todos
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Tecnologia"
                />
                Tecnologia
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Ropa"
                />
                Ropa
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Accesorios"
                />
                Accesorios
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Electro - Domesticos"
                />
                Electro - Domesticos
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Comida"
                />
                Comida
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Videojuegos"
                />
                Videojuegos
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Vehiculos"
                />
                Vehiculos
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Servicios"
                />
                Servicios
              </li>
              <li className="text-negro font-breeSerif text-md flex flex-wrap gap-1 items-center">
                <input
                  type="radio"
                  name="filtrado"
                  onClick={handleChange}
                  value="Belleza"
                />
                Belleza
              </li>
            </ul>
            <h3 className="text-xl font-breeSerif font-bold mt-8 mb-4">
              Acciones:
            </h3>
            {user.rol === "admin" ? (
              <button
                onClick={(e) => {
                  setCurrentItem(null);
                  setModal(true);
                }}
                className="mb-12 rounded-xl text-blanco hover:bg-naranja transition-all duration-500 bg-azul font-breeSerif px-4 py-2"
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                type="button"
              >
                Agregar Producto
              </button>
            ) : (
              <></>
            )}
          </section>
          <section
            id="tienda"
            className="md:ml-[20%] h-auto w-[100%] md:w-[80%] p-2 md:px-6 gap-8 flex flex-wrap items-center justify-center"
          >
            {productos.length === 0 ? (
              <h3 class="text-2xl text-negro font-roboto font-bold">
                No hay Productos
              </h3>
            ) : (
              productos.map((item, index) =>
                item.cantidad == 0 ? (
                  <></>
                ) : (
                  <>
                    <Tarjeta
                      key={index}
                      item={item}
                      setModal={setModal}
                      setCurrentItem={setCurrentItem}
                    />
                  </>
                )
              )
            )}

            <div className="w-full flex gap-2 justify-center">
              <button
                className="p-2 border-2 border-azul bg-azul text-blanco text-md font-hanuman rounded-md"
                onClick={previusPage}
              >
                Anterior
              </button>
              <button
                className="p-2 border-2 border-azul bg-azul text-blanco text-md font-hanuman rounded-md"
                disabled
              >
                {currentPage + 1}
              </button>
              <button
                className="p-2 border-2 border-azul bg-azul text-blanco text-md font-hanuman rounded-md"
                onClick={nextPage}
              >
                Siguiente
              </button>
            </div>
          </section>
        </div>
        {modal ? (
          <StoreForm setModal={setModal} producto={currentItem} />
        ) : (
          <></>
        )}
      </main>
    </>
  );
}

export default Store;
