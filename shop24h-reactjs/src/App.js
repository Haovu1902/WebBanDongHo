import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsList from "./pages/ProductList";
import ProductDitails from "./pages/ProductDitail";
import GioHangShop from "./pages/GioHangShop";

function App() {
  return (
    <div>
      < Routes>
        < Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product" element={< ProductsList />}></Route>
        <Route path="/product/:id" element={< ProductDitails />}></Route>
        <Route path = "/giohang" element={<GioHangShop/>}></Route> 
        <Route path="*" element={< Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
