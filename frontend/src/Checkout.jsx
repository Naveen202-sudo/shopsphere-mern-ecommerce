
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api/axios";

function Checkout() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const totalPrice = cart.reduce(
        (total, product) => {
            return total +
                product.price *
                (product.quantity || 1);
        },
        0
    );


    const placeOrder = async () => {

        try {

            setLoading(true);

            if (cart.length === 0) {

                alert("Cart is empty");

                return;
            }


            for (const product of cart) {

                const orderData = {

                    product: product._id,

                    quantity:
                        product.quantity || 1,

                    price: product.price

                };

                await API.post(
                    "/order",
                    orderData
                );
            }


            alert(
                "Order placed successfully!"
            );

            localStorage.removeItem("cart");

            navigate("/myorders");


        } catch (error) {

            console.log(
                "ORDER ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Order failed"
            );


        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="checkout-page">

            <h1>
                Checkout
            </h1>


            {cart.length === 0 ? (

                <div className="empty-checkout">

                    <h2>
                        Your cart is empty
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            ) : (

                <div className="checkout-container">

                    {/* Products */}

                    <div className="checkout-products">

                        <h2>
                            Order Items
                        </h2>


                        {cart.map(
                            (product, index) => (

                                <div
                                    className="checkout-item"
                                    key={index}
                                >

                                    <img
                                        src={`http://localhost:8000${product.images[0].image}`}
                                        alt={product.name}
                                    />


                                    <div>

                                        <h3>
                                            {product.name}
                                        </h3>

                                        <p>
                                            ₹{product.price}
                                        </p>

                                        <p>
                                            Quantity:{" "}
                                            {product.quantity || 1}
                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                    </div>


                    {/* Payment Summary */}

                    <div className="checkout-summary">

                        <h2>
                            Order Summary
                        </h2>


                        <div className="checkout-row">

                            <span>
                                Items
                            </span>

                            <span>
                                {cart.length}
                            </span>

                        </div>


                        <div className="checkout-row checkout-total">

                            <span>
                                Total
                            </span>

                            <span>
                                ₹{totalPrice}
                            </span>

                        </div>


                        <button
                            className="place-order-button"
                            onClick={placeOrder}
                            disabled={loading}
                        >

                            {loading
                                ? "Placing Order..."
                                : "Place Order"
                            }

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Checkout;

