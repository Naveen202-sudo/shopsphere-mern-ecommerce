
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";

import { useEffect, useState } from "react";

import API from "./api/axios";
import "./App.css";

import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
import MyOrders from "./MyOrders";
import ProtectedRoute from "./ProtectedRoute";
import AdminOrders from "./AdminOrder";
import Register from "./Register";


// =========================
// NAVBAR
// =========================

function Navbar() {

    const navigate = useNavigate();


    // =========================
    // Logout
    // =========================

    const logoutUser = async () => {

        try {

            await API.get("/logout");

            alert("Logout successful!");

            navigate("/login");

        } catch (error) {

            console.log("LOGOUT ERROR:", error);

            console.log(
                "RESPONSE:",
                error.response
            );

            console.log(
                "DATA:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Logout failed"
            );
        }
    };


    return (

        <nav className="navbar">

            <h2 className="logo">
                ShopSphere
            </h2>


            <div className="nav-links">

                <Link to="/">
                    <button>
                        Home
                    </button>
                </Link>


                <Link to="/cart">
                    <button>
                        Cart
                    </button>
                </Link>


                <Link to="/myorders">
                    <button>
                        My Orders
                    </button>
                </Link>


                <Link to="/admin/orders">
                    <button>
                        Admin Orders
                    </button>
                </Link>


                <button onClick={logoutUser}>
                    Logout
                </button>

            </div>

        </nav>
    );
}





function Home() {

    const [products, setProducts] = useState([]);

    const [keyword, setKeyword] = useState("");


    const getProducts = async (searchKeyword = "") => {

        try {

            const response = await API.get(
                `/products?keyword=${searchKeyword}`
            );

            console.log(
                "PRODUCTS:",
                response.data
            );

            setProducts(
                response.data.products
            );

        } catch (error) {

            console.log(
                "PRODUCT ERROR:",
                error
            );
        }
    };


    // =========================
    // Load Products
    // =========================

    useEffect(() => {

        getProducts();

    }, []);


    // =========================
    // Search Products
    // =========================

    const searchProducts = (e) => {

        e.preventDefault();

        getProducts(keyword);

    };


    return (

        <div>


            {/* =========================
                Search
            ========================= */}

            <div className="search-container">

                <form onSubmit={searchProducts}>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                    />


                    <button type="submit">
                        Search
                    </button>

                </form>

            </div>



            {/* =========================
                Products
            ========================= */}

            <div className="products-container">

                <h1>
                    Products
                </h1>


                {products.length === 0 ? (

                    <p>
                        No products found
                    </p>

                ) : (

                    products.map((product) => (

                        <div
                            className="product-card"
                            key={product._id}
                        >


                            {/* Product Image */}

                            <img
                                src={`http://localhost:8000${product.images[0].image}`}
                                alt={product.name}
                            />


                            {/* Product Name */}

                            <h3>
                                {product.name}
                            </h3>


                            {/* Product Price */}

                            <p className="price">
                                ₹{product.price}
                            </p>


                            {/* Rating */}

                            <p>
                                ⭐ {product.ratings}
                            </p>


                            {/* View Product */}

                            <Link
                                to={`/product/${product._id}`}
                            >

                                <button>
                                    View Product
                                </button>

                            </Link>


                        </div>

                    ))

                )}

            </div>

        </div>
    );
}



// =========================
// MAIN LAYOUT
// =========================

function MainLayout() {

    return (

        <>

            {/* Navbar */}

            <Navbar />


            {/* Pages */}

            <Routes>

                {/* Home */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* Product Details */}

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />


                {/* Cart */}

                <Route
                    path="/cart"
                    element={<Cart />}
                />


                {/* Checkout */}

                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />


                {/* My Orders */}

                <Route
                    path="/myorders"
                    element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Orders */}

                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute>
                            <AdminOrders />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </>
    );
}



// =========================
// APP
// =========================

function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* =========================
                    LOGIN
                    No Navbar
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =========================
                    REGISTER
                    No Navbar
                ========================= */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    ALL OTHER PAGES
                    Navbar Included
                ========================= */}

                <Route
                    path="*"
                    element={<MainLayout />}
                />


            </Routes>

        </BrowserRouter>
    );
}


export default App;




