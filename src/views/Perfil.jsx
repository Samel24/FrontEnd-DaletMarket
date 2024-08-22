import Header from "../components/Header";
import PerfilForm from "../components/forms/PerfilForm";
import logo from "../assets/Logo Dalet Market.jpg";

function Perfil() {
  return (
    <>
      <Header />

      <main className="w-full h-auto min-h-[100vh]">
        <div className="h-[80px]" id="productos-disponibles"></div>
        <div className="w-full h-[100vh] bg-negro bg-opacity-[35%] flex justify-center items-center ">
            <section className="flex flex-col justify-center items-center gap-8 h-[80%] md:h-[90%] w-[90%] md:w-2/3 bg-blanco rounded-xl border-[3px] border-naranja">
              <h2 className="text-4xl text-center font-lato font-extrabold">
                Perfil de Usuario
              </h2>
              <PerfilForm />
            </section>
          </div>
      </main>
    </>
  );
}

export default Perfil;
