
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api/axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const registerUser = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/register", {
                name,
                email,
                password
            });

            console.log(res.data);

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            console.log("REGISTER ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-header">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Join ShopSphere today
                    </p>

                </div>

                <form
                    className="register-form"
                    onSubmit={registerUser}
                >

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

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
                        className="register-button"
                    >
                        Register
                    </button>

                </form>

                <p className="register-footer">
                    Already have an account?
                    {" "}
                    <span
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Register;
