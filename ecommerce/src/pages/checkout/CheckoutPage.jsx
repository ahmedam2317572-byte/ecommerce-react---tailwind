import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { CheckoutHeader } from "./CheckoutHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CheckoutPage.css";
import "./CheckoutHeader.css";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );

      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };

    getCheckoutData();
  }, [cart]);

  return (
    <>
      <link rel="icon" href="/public/images/cart-favicon.png" />

      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
