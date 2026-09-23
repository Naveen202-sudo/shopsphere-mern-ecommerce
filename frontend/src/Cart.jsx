
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {

    const [cart, setCart] = useState([]);

    useEffect(() => {

        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCart(savedCart);

    }, []);


    const increaseQuantity = (index) => {

        const newCart = [...cart];

        newCart[index].quantity =
            (newCart[index].quantity || 1) + 1;

        setCart(newCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );
    };


    const decreaseQuantity = (index) => {

        const newCart = [...cart];

        if ((newCart[index].quantity || 1) > 1) {

            newCart[index].quantity -= 1;

        }

        setCart(newCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );
    };


    const removeFromCart = (index) => {

        const newCart =
            cart.filter((_, i) => i !== index);

        setCart(newCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );
    };


    const totalPrice = cart.reduce(
        (total, product) => {

            return total +
                product.price *
                (product.quantity || 1);

        },
        0
    );


    return (

        <div className="cart-page">

            <h1>
                Shopping Cart
            </h1>


            {cart.length === 0 ? (

                <div className="empty-cart">

                    <h2>
                        Your cart is empty
                    </h2>

                    <Link to="/">
                        <button>
                            Continue Shopping
                        </button>
                    </Link>

                </div>

            ) : (

                <div className="cart-container">

                    {/* Cart Products */}

                    <div className="cart-products">

                        {cart.map((product, index) => (

                            <div
                                className="cart-item"
                                key={index}
                            >

                                <img
                                    src={`http://localhost:8000${product.images[0].image}`}
                                    alt={product.name}
                                />


                                <div className="cart-item-info">

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p className="cart-price">
                                        ₹{product.price}
                                    </p>

                                    <p>
                                        ⭐ {product.ratings}
                                    </p>


                                    {/* Quantity */}

                                    <div className="quantity">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(index)
                                            }
                                        >
                                            −
                                        </button>


                                        <span>
                                            {product.quantity || 1}
                                        </span>


                                        <button
                                            onClick={() =>
                                                increaseQuantity(index)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>


                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            removeFromCart(index)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* Order Summary */}

                    <div className="cart-summary">

                        <h2>
                            Order Summary
                        </h2>

                        <div className="summary-row">

                            <span>
                                Items
                            </span>

                            <span>
                                {cart.length}
                            </span>

                        </div>


                        <div className="summary-row total-row">

                            <span>
                                Total
                            </span>

                            <span>
                                ₹{totalPrice}
                            </span>

                        </div>


                        <Link to="/checkout">

                            <button className="checkout-button">
                                Proceed to Checkout
                            </button>

                        </Link>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Cart;
