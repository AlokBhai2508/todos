import TopMenu from "./My Cmponents/topMenu";
import "./css/App.css"
import { Routes, Route, Router } from "react-router-dom"
import Home from "./pages/home";
function App() {
  return (
    <>
      <TopMenu />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>


    </div>
    </>

  );
}

export default App;
