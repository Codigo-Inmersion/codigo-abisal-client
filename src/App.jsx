import "./App.css";
import Background from "./components/layout/Background/background";


function App() {
  return (
    <div className="app-container">
      <Background/>

      {/* Contenido de la app */}
      <div className="app-content">
        <h1>Bienvenido a Código Abisal</h1>
        <p>Prueba</p>
        {/* Aquí rutas, componentes, etc */}
      </div>
    </div>
  );
}

export default App;
