import { useContext, useEffect, useState } from "react";
import { Contexto } from "../context/Contexto";
import Header from "../components/Header";
import Tarjeta from "../components/Tarjeta";
import StoreForm from "../components/forms/StoreForm";

function Favoritos() {
  const { store, setStore, peticionGet, user, setFav } = useContext(Contexto);

  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      let respuesta = await peticionGet(
        "http://localhost:3000/favoritos/all",
        "GET"
      );
      if (respuesta.status === 200) {
        let nuevoStore = [];
        respuesta.favoritos.forEach((favorito) => {
          store.forEach((item) => {
            if (
              favorito.producto === item._id &&
              favorito.username === user.username
            ) {
              nuevoStore.push(item);
            }
          });
        });
        setFav(true);
        return setStore(nuevoStore);
      }
    };
    cargar();
  }, []);

  return (
    <>
      <Header />

      <main className="w-full h-auto py-8 px-4 lg:p-8 min-h-[100vh]">
        <div className="h-[80px]" id="productos-disponibles"></div>
        <h2 className="text-2xl font-lato text-negro mb-8">
          Productos Favoritos (<i id="cantidad">{store.length}</i>)
        </h2>
        <div className="flex flex-col md:flex-row">
          <section
            id="tienda"
            className="h-auto w-[100%] p-2 md:px-6 gap-8 flex flex-wrap items-center justify-center"
          >
            {store.length === 0 ? (
              <h3 class="text-2xl text-negro font-roboto font-bold">
                No hay Productos Favoritos
              </h3>
            ) : (
              store.map((item, index) =>
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
          </section>
        </div>
        {modal ? (
          <StoreForm setModal={setModal} producto={currentItem} />
        ) : (
          <></>
        )}
      </main>

      {/**/}
    </>
  );
}

export default Favoritos;
