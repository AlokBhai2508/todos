import TopMenu from "./My Cmponents/topMenu";
import "./css/App.css"
import { Routes, Route, Router } from "react-router-dom"
import Home from "./pages/home";
import About from "./pages/about";
import Blog from "./pages/blog";
import NotFound from "./pages/notfound";
import Dashboard from "./admin/dashboard";
function App() {
  return (
    <>
      <TopMenu />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:blogSlug" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>


    </div>
    </>

  );
}

export default App;
