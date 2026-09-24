import { Header } from "../../components/Header";
import { OrderHeader } from "./OrderHeader";
import { OrderDetails } from "./OrderDetails";
import "./OrdersPage.css";
import { useState, useEffect } from "react";
import axios from "axios";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      const response = await axios.get("api/orders?expand=products");
      setOrders(response.data);
    };
    getOrderData();
  }, []);

  return (
    <>
      <link rel="icon" href="/public/images/orders-favicon.png" />

      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <OrderHeader order={order} />

                <OrderDetails order={order} loadCart={loadCart} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
