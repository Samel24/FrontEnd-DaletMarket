import logo from "../assets/Logo Dalet Market.jpg";
import LoginForm from "../components/forms/LoginForm";

function Login() {
  return (
    <>
      <main id="main">
        <div className="w-full h-[100vh] bg-fondo bg-cover">
          <div className="w-full h-[100vh] bg-negro bg-opacity-[35%] absolute flex justify-center items-center ">
            <section className="flex flex-col justify-center items-center gap-8 h-[80%] md:h-[60%] w-[90%] relative md:w-2/3 bg-blanco rounded-xl border-[3px] border-naranja">
              <img
                src={logo}
                alt="Logo daletmarket"
                className="absolute rounded-full border-[3px] border-naranja w-[100px] md:w-[200px] h-[100px] md:h-[200px] -top-12 md:-top-24"
              />
              <h2 className="text-4xl text-center font-lato font-extrabold">
                Iniciar Sesion
              </h2>
              <LoginForm />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
