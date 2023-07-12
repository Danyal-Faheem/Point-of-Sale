import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
// import { Products } from './components/Products1'
import { AddProduct } from "./components/AddProduct";
import { Suspense, lazy } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Signin } from "./components/Signin.tsx";
import { NavigationBar } from "./components/Navbar.tsx";

const Products = lazy(() =>
  import("./components/Products.tsx").then((module) => {
    return { default: module.Products };
  })
);

// const ErrorBoundary = lazy(() => import("./components/ErrorBoundary.tsx"));

function App() {
  return (
    <>
    <NavigationBar/>
    <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route path='/user' element={</>} /> */}
          <Route path="/add" element={<AddProduct />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Suspense>
    </>
  );
}

export default App;
