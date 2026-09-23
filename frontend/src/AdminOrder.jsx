
import { useEffect, useState } from "react";
import API from "./api/axios";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    const getOrders = async () => {

        try {

            const response =
                await API.get("/orders");

            console.log(
                "ADMIN ORDERS:",
                response.data
            );

            setOrders(
                response.data.orders
            );

        } catch (error) {

            console.log(
                "GET ORDERS ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);

        }
    };


    const updateStatus = async (
        orderId,
        status
    ) => {

        try {

            const response =
                await API.put(
                    `/order/${orderId}`,
                    {
                        status: status
                    }
                );

            console.log(
                "STATUS UPDATE:",
                response.data
            );

            alert(
                "Order status updated!"
            );

            getOrders();

        } catch (error) {

            console.log(
                "UPDATE STATUS ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Status update failed"
            );
        }
    };


    useEffect(() => {

        getOrders();

    }, []);


    if (loading) {

        return (
            <div className="admin-loading">
                <h2>
                    Loading Orders...
                </h2>
            </div>
        );
    }


    return (

        <div className="admin-orders-page">

            <div className="admin-header">

                <h1>
                    Admin Orders
                </h1>

                <p>
                    Manage customer orders
                </p>

            </div>


            {orders.length === 0 ? (

                <div className="no-orders">

                    <h2>
                        No orders found
                    </h2>

                </div>

            ) : (

                <div className="admin-orders-list">

                    {orders.map((order) => (

                        <div
                            className="admin-order-card"
                            key={order._id}
                        >

                            <div className="admin-order-info">

                                <h3>
                                    Order ID
                                </h3>

                                <p className="order-id">
                                    {order._id}
                                </p>


                                <div className="admin-info-row">

                                    <span>
                                        Product ID
                                    </span>

                                    <span>
                                        {order.product}
                                    </span>

                                </div>


                                <div className="admin-info-row">

                                    <span>
                                        Quantity
                                    </span>

                                    <span>
                                        {order.quantity}
                                    </span>

                                </div>


                                <div className="admin-info-row">

                                    <span>
                                        Price
                                    </span>

                                    <span>
                                        ₹{order.price}
                                    </span>

                                </div>

                            </div>


                            <div className="admin-status">

                                <p>
                                    Current Status
                                </p>

                                <strong>
                                    {order.status}
                                </strong>


                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Processing">
                                        Processing
                                    </option>

                                    <option value="Shipped">
                                        Shipped
                                    </option>

                                    <option value="Delivered">
                                        Delivered
                                    </option>

                                </select>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminOrders;
