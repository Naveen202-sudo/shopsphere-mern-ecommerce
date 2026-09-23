
import { useEffect, useState } from "react";
import API from "./api/axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        API.get("/me")
            .then((res) => {

                setAuthenticated(true);
                setLoading(false);

            })
            .catch((error) => {

                console.log("AUTH ERROR:", error);

                setAuthenticated(false);
                setLoading(false);

            });

    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;