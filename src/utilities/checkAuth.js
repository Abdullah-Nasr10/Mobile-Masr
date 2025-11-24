import { toast } from "react-toastify";
const checkAuth = async (param, navigate) => {
    try {
        const res = await fetch(`http://localhost:3000/${param}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (res.status !== 200) {
            console.warn("Request failed with status:", res.status);
            toast.error("you are not authorized");
            if (navigate) navigate("/login");
            return;
        }

        const data = await res.json();
        console.log("data:", data);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        toast.error("An error occurred on server");
        if (navigate) navigate("/login");
    }
};

export default checkAuth;