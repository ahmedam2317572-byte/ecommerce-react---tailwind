import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const DEVICE_ID_KEY = "ecommerce-device-id";

const getOrCreateDeviceId = () => {
  const savedDeviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (savedDeviceId) {
    return savedDeviceId;
  }

  const newDeviceId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(DEVICE_ID_KEY, newDeviceId);
  return newDeviceId;
};

const deviceId = getOrCreateDeviceId();
axios.defaults.headers.common["X-Device-Id"] = deviceId;

window.axios = axios;
function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/orders"
          element={<OrdersPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />
        <Route path="*" element={<NotFoundPage cart={cart} />} />
      </Routes>
    </>
  );
}

export default App;
