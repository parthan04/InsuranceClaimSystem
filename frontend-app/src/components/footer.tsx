export default function Footer() {
    return (
        <>
            {/* Footer Section */}
            <div className="container-fluid bg-dark footer mt-5 pt-5">
            <div className="container py-5">
                <div className="row g-5">
                {/* Logo & About */}
                <div className="col-lg-3 col-md-6">
                    <h1 className="text-white mb-4 d-flex align-items-center">
                    <img
                        className="img-fluid me-3"
                        src="/template/images/icon/icon-02-light.png"
                        alt="Logo"
                    />
                    Insure
                    </h1>
                    <p className="text-white">
                    Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
                    ipsum et lorem et sit, sed stet lorem sit clita
                    </p>
                    <div className="d-flex pt-2">
                    <a className="btn btn-square me-1" href="#"><i className="bi bi-twitter"></i></a>
                    <a className="btn btn-square me-1" href="#"><i className="bi bi-facebook"></i></a>
                    <a className="btn btn-square me-1" href="#"><i className="bi bi-youtube"></i></a>
                    <a className="btn btn-square me-0" href="#"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>

                {/* Address */}
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Address</h5>
                    <p className="text-white"><i className="bi bi-map me-3"></i>123 Street, New York, USA</p>
                    <p className="text-white"><i className="bi bi-phone me-3"></i>+012 345 67890</p>
                    <p className="text-white"><i className="bi bi-envelope me-3"></i>info@example.com</p>
                </div>

                {/* Quick Links */}
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Quick Links</h5>
                    <a className="btn btn-link text-white" href="#">About Us</a>
                    <a className="btn btn-link text-white" href="#">Contact Us</a>
                    <a className="btn btn-link text-white" href="#">Our Services</a>
                    <a className="btn btn-link text-white" href="#">Terms & Conditions</a>
                    <a className="btn btn-link text-white" href="#">Support</a>
                </div>

                {/* Newsletter */}
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Newsletter</h5>
                    <p className="text-white">Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="container-fluid copyright bg-dark text-white py-3">
                <div className="container d-flex justify-content-between">
                <div>&copy; <a href="#" className="text-white">Your Site Name</a>, All Rights Reserved.</div>
                <div>
                    Designed By <a href="https://htmlcodex.com" target="_blank" className="text-white">HTML Codex</a> | 
                    Distributed By <a href="https://themewagon.com" target="_blank" className="text-white">ThemeWagon</a>
                </div>
                </div>
            </div>

            {/* Back to top button */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up"></i>
            </a>
            </div>           
        </>
    );
}