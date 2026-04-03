import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {


    const login = localStorage.getItem("access");

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");


    const getInitials = (name: string) => {
        if(!name) return "";

        const words = name.trim().split(" ");

        if (words.length === 1) {
            return words[0][0].toUpperCase();
        }
        return (
            words[words.length - 1][0].toUpperCase()
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        navigate("/");
    }

    useEffect(()=> {
        const handleClickOutside = (event: MouseEvent) => {
            if(
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown",handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown",handleClickOutside);
        };
    
    },[]);

    return (
        <>
            {/* Top Info */}
            <div className="container-fluid bg-dark text-white-50 py-2 px-0 d-none d-lg-block">
                <div className="row gx-0 align-items-center">
                    <div className="col-lg-7 px-5 text-start">
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <i className="fa fa-phone-alt me-2"></i>
                            <small>+012 345 6789</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <i className="far fa-envelope-open me-2"></i>
                            <small>info@example.com</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <i className="far fa-clock me-2"></i>
                            <small>Mon - Fri : 09 AM - 09 PM</small>
                        </div>
                    </div>
                    <div className="col-lg-5 px-5 text-end">
                        <div className="h-100 d-inline-flex align-items-center">
                            <Link className="text-white-50 ms-4" to="/">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link className="text-white-50 ms-4" to="/">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link className="text-white-50 ms-4" to="/">
                                <i className="fab fa-linkedin-in"></i>
                            </Link>
                            <Link className="text-white-50 ms-4" to="/">
                                <i className="fab fa-instagram"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
                <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <h1 className="m-0">
                            <img
                                className="img-fluid me-3"
                                src="/template/images/icon/icon-02-primary.png"
                                alt=""
                            />
                            Insure
                        </h1>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav mx-auto bg-light rounded pe-4 py-3 py-lg-0">
                            <Link to="/" className="nav-item nav-link active">
                                Home
                            </Link>
                            <Link to="/" className="nav-item nav-link">
                                About Us
                            </Link>
                            <Link to="/#policies" className="nav-item nav-link">
                                Our Services
                            </Link>
                            <Link to="/" className="nav-item nav-link">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                    {!login && (

                    <Link to="/login" className="btn btn-primary px-3 d-none d-lg-block">
                        <i className="fa fa-sign-in-alt"></i> Login
                    </Link>
                    )}


                    {login && user && (
                            <>
                                <div className="btn px-3 d-lg-block">
                                    <i className="fa fa-bell"></i>
                                </div>
                                <div className="user-menu" ref={dropdownRef}>
                                    <div className="d-flex align-items-center px-3" onClick={()=> setOpen(!open)}>
                                        <div className="avatar-circle">{getInitials(user.username)}</div> 
                                        <div className="username ps-2">
                                            {user.username}
                                            <br/>
                                            <small>{user.email}</small>
                                        </div>
                                    </div>
                                    {open && (
                                        <div className="dropdown-box">

                                            <Link to="/" className="dropdown-item">
                                                My Policies
                                            </Link>

                                            <Link to="/" className="dropdown-item">
                                                Policies
                                            </Link>

                                            <Link to="/" className="dropdown-item">
                                                Claims
                                            </Link>

                                            <hr/>

                                            <button
                                                className="dropdown-item logout-btn"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>

                                        </div>
                                    )}
                                </div>
                            </>
                    )}     
                </nav>
        </>
    );
}