
import { useEffect, useState } from "react";
import API from "./api/axios";
import { useNavigate } from "react-router-dom";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();


    

    useEffect(() => {

        API.get("/myorders")
            .then((res) => {

                setOrders(
                    res.data.orders
                );

            })
            .catch((error) => {

                console.log(
                    "MY ORDERS ERROR:",
                    error
                );

            });

    }, []);


    return (

        <div className="my-orders-page">


            {/* =========================
                HEADER
            ========================= */}

            <div className="orders-header">

                <h1>
                    My Orders
                </h1>

            </div>


            {/* =========================
                NO ORDERS
            ========================= */}

            {orders.length === 0 ? (

                <div className="empty-orders">

                    <h2>
                        No orders found
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


                /* =========================
                   ORDERS LIST
                ========================= */

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order._id}
                        >


                            {/* =========================
                                PRODUCT
                            ========================= */}

                            <div className="order-product">

                                {order.product?.images?.length > 0 && (

                                    <img
                                        src={`http://localhost:8000${order.product.images[0].image}`}
                                        alt={order.product.name}
                                    />

                                )}


                                <div>

                                    <h2>
                                        {order.product?.name ||
                                            "Product"}
                                    </h2>


                                    <p>
                                        Quantity:{" "}
                                        {order.quantity}
                                    </p>


                                    <p>
                                        Price: ₹{order.price}
                                    </p>

                                </div>

                            </div>


                            {/* =========================
                                ORDER DETAILS
                            ========================= */}

                            <div className="order-details">

                                <p>

                                    <b>Order ID:</b>

                                    <br />

                                    {order._id}

                                </p>


                                <p>
                                    <b>Status:</b>
                                </p>


                                <span
                                    className={`order-status ${order.status
                                        ?.toLowerCase()
                                        .replace(" ", "-")}`}
                                >
                                    {order.status}
                                </span>

                            </div>


                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}


export default MyOrders;


