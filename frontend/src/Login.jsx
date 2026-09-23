
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api/axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginUser = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/login", {
                email,
                password
            });

            console.log(res.data);

            alert("Login successful!");

            navigate("/");

        } catch (error) {

            console.log("LOGIN ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Login to your ShopSphere account
                    </p>

                </div>

                <form
                    className="login-form"
                    onSubmit={loginUser}
                >

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>

                <p className="login-footer">
                    Don't have an account?
                    {" "}
                    <span
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;

