import "./App.css";
import LiquidEther from "./components/LiquidEther";
import Footer from "./layout/Footer";
import NavBar from "./layout/NavBar";
import NavBar2 from "./layout/NavBar2";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="app-container">
      <NavBar/>
      <NavBar2/>
      <LoginPage/>

      {/* Fondo LiquidEther fijo */}
      <div className="liquid-ether-background">
        <LiquidEther
          colors={["#5227FF", "#A4DEFB", "#A4FBFB"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Contenido de la app */}
      <div className="app-content">
        <h1>Bienvenido a Código Abisal</h1>
        <p>Prueba</p>
        {/* Aquí rutas, componentes, etc */}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
