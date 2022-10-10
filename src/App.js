import "./styles/app.scss";
import { Card } from "./components/card/Card";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Card />}></Route>
      </Routes>
    </div>
  );
}

export default App;
