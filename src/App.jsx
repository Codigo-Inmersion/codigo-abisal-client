import "./App.css";
import LiquidEther from "./components/LiquidEther";
import LoginPage from "./pages/RegisterPage";


function App() {
  return (
    <div className="app-container">

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
      
    </div>
  );
}

export default App;
