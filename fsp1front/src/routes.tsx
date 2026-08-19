import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Detalle from "./Detalle.jsx";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/movie/:id" element={<Detalle/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;