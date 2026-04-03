import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){

    const navigate = useNavigate();
    const logout =()=>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user")
        navigate("/")
    }
    return (
        <>
            <h1>Admin Dashboard</h1>
            <button onClick={logout} className="btn btn-primary px-3 d-none d-lg-block">
                Logout
            </button>      
        </>
    )
}