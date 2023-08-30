import TopMenu from "./My Cmponents/topMenu";
import "./css/App.css"
import { Routes, Route, Router } from "react-router-dom"
import Home from "./pages/home";
import About from "./pages/about";
import Blog from "./pages/blog";
import NotFound from "./pages/notfound";
import Dashboard from "./admin/dashboard";
import Edit from "./admin/edit";
import New from "./admin/new";
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
          <Route path="/admin/new" element={<New />} />
          <Route path="/edit/:blogSlug" element={<Edit />} />
        </Routes>


    </div>
    </>

  );
}

export default App;
