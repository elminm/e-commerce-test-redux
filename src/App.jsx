import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/private/HomePage";
import Product from "./pages/private/Product";
import Basket from "./pages/private/Basket";
import LoginPage from "./pages/public/LoginPage";
import Register from "./pages/public/Register";
import AuthLogin from "./pages/public/AuthLogin";
import Admin from "./pages/private/Admin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import EditPage from "./pages/private/EditPage";
function App() {
  const { setProducts } = useContext(Context);
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await axios("https://fakestoreapi.com/products"),
  });
  useEffect(() => {
    setProducts(data);
  }, [data, setProducts]);
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Product />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/edit/:id"
            element={
              <AuthLogin>
                <EditPage />
              </AuthLogin>
            }
          />

          <Route
            path="/admin"
            element={
              <AuthLogin>
                <Admin />
              </AuthLogin>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
