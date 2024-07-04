import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import "./Style/App.css";
import Header from "./Component/Header";
import Home from "./Component/Home";
import { Routes } from "react-router-dom";
import Checkoutold from "./Component/Checkoutold";
import { Space, Alert } from "antd";
import Login from "./features/auth/Login";
import ProductsList from "./features/product-list/ProductsList";
import Navbar from "./features/navbar/Navbar";
import ProductFilter from "./features/product-list/ProductFilter";
import SignUP from "./features/auth/SignUp";
import Cart from "./features/cart/Cart";
import ThemeChanger from "./Component/ThemeChanger";
import Checkout from "./features/cart/Checkout";
import Prodductdetails from "./features/product-list/Prodductdetails";
import Security from "./features/auth/Security";
import { useDispatch, useSelector } from "react-redux";
import { CheckUser } from "./features/auth/authSlice";
import { GetCart } from "./features/cart/cartSlice";
import OrderPage from "./features/orders/OrdersPage";
import UserProfile from "./features/auth/UserProfile";
const onClose = (e) => {
  console.log(e, "I was closed.");
};
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

function App() {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [theme, settheme] = useState(themes[23]);
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  useEffect(() => {
    dispatch(CheckUser());
    dispatch(GetCart());
  }, []);
  return (
    <div data-theme={theme} className="app  ease-out duration-700">
      <Routes>
        <Route
          path="/checkout"
          element={
            <Security>
              {" "}
              <div className="app">
                <Navbar></Navbar>
                <Checkout></Checkout>
              </div>
            </Security>
          }
        ></Route>

        <Route
          path="/"
          element={
            <Security>
              {" "}
              <div className="app">
                <Navbar></Navbar>
                <label
                  className="swap swap-rotate  z-50 right-3 top-24 fixed rounded-lg bg-black pr-10 opacity-75 translate-y-44"
                  onClick={() => {
                    const randomNumber = Math.floor(Math.random() * 27) + 1;
                    console.log(randomNumber);
                    settheme(themes[randomNumber]);
                  }}
                >
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" className=" hidden" />

                  {/* sun icon */}
                  <ThemeChanger></ThemeChanger>
                </label>
                <Home></Home>
              </div>
            </Security>
          }
        />
        <Route path="/login" element={<Login></Login>} />
        <Route
          path="/signin"
          element={
            <div className="app">
              <SignUP></SignUP>
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <Security>
              {" "}
              <div className="app">
                <Navbar>
                  <Cart></Cart>
                </Navbar>
              </div>
            </Security>
          }
        />
        <Route
          path="/products"
          element={
            <Security>
              {" "}
              <div className="app">
                <Navbar>
                  <label
                    className="swap swap-rotate  z-50 right-3 top-24 fixed rounded-lg bg-black pr-10 opacity-75 translate-y-44"
                    onClick={() => {
                      const randomNumber = Math.floor(Math.random() * 27) + 1;
                      console.log(randomNumber);
                      settheme(themes[randomNumber]);
                    }}
                  >
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" className=" hidden" />

                    {/* sun icon */}
                    <ThemeChanger></ThemeChanger>
                  </label>
                  <ProductFilter></ProductFilter>
                </Navbar>
              </div>
            </Security>
          }
        />
        <Route
          path="/orders"
          element={
            <Security>
              <div className="app">
                <Navbar>
                  <label
                    className="swap swap-rotate  z-50 right-3 top-24 fixed rounded-lg bg-black pr-10 opacity-75 translate-y-44"
                    onClick={() => {
                      const randomNumber = Math.floor(Math.random() * 27) + 1;
                      console.log(randomNumber);
                      settheme(themes[randomNumber]);
                    }}
                  >
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" className=" hidden" />

                    {/* sun icon */}
                    <ThemeChanger></ThemeChanger>
                  </label>
                  <OrderPage></OrderPage>
                </Navbar>
              </div>
            </Security>
          }
        />
        <Route
          path="/profile"
          element={
            <Security>
              <div className="app">
                <Navbar>
                  <label
                    className="swap swap-rotate  z-50 right-3 top-24 fixed rounded-lg bg-black pr-10 opacity-75 translate-y-44"
                    onClick={() => {
                      const randomNumber = Math.floor(Math.random() * 27) + 1;
                      console.log(randomNumber);
                      settheme(themes[randomNumber]);
                    }}
                  >
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" className=" hidden" />

                    {/* sun icon */}
                    <ThemeChanger></ThemeChanger>
                  </label>
                  <UserProfile></UserProfile>
                </Navbar>
              </div>
            </Security>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Security>
              {" "}
              <div className="app bg-gradient-to-tr  from-accent  via-primary to-secondary">
                <Navbar>
                  <label
                    className="swap swap-rotate  z-50 right-3 top-24 fixed rounded-lg bg-black pr-10 opacity-75 translate-y-44"
                    onClick={() => {
                      const randomNumber = Math.floor(Math.random() * 27) + 1;
                      console.log(randomNumber);
                      settheme(themes[randomNumber]);
                    }}
                  >
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" className=" hidden" />

                    {/* sun icon */}
                    <ThemeChanger></ThemeChanger>
                  </label>
                  <Prodductdetails></Prodductdetails>
                </Navbar>
              </div>
            </Security>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
