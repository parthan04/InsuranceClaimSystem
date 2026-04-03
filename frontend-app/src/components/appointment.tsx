export default function Appointment() {
    return (
        <>
            <div className="container-fluid appointment my-5 py-5" data-aos="fade-up" data-aos-delay="100">
                <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                    <h1 className="display-6 text-white mb-5">
                        We're Award Winning Insurance Company
                    </h1>
                    <p className="text-white mb-5">
                        Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed
                        stet lorem sit clita duo justo magna dolore erat amet. Tempor erat
                        elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet
                        diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit
                        clita duo justo magna.
                    </p>
                    <div className="bg-white rounded p-3">
                        <div className="d-flex align-items-center bg-primary rounded p-3">
                        <img
                            className="flex-shrink-0 rounded-circle me-3"
                            src="/template/images/profile.jpg"
                            alt=""
                        />
                        <h5 className="text-white mb-0">Call Us: +012 345 6789</h5>
                        </div>
                    </div>
                    </div>

                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
                    <div className="bg-white rounded p-5">
                        <form>
                        <div className="row g-3">
                            {[
                            { id: "name", type: "text", label: "Your Name", placeholder: "Your Name" },
                            { id: "email", type: "email", label: "Your Email", placeholder: "Your Email" },
                            { id: "mobile", type: "text", label: "Your Mobile", placeholder: "Your Mobile" },
                            { id: "service", type: "text", label: "Service Type", placeholder: "Service Type" },
                            ].map((input, idx) => (
                            <div className="col-sm-6" key={idx}>
                                <div className="form-floating">
                                <input
                                    type={input.type}
                                    className="form-control"
                                    id={input.id}
                                    placeholder={input.placeholder}
                                />
                                <label htmlFor={input.id}>{input.label}</label>
                                </div>
                            </div>
                            ))}

                            <div className="col-12">
                            <div className="form-floating">
                                <textarea
                                className="form-control"
                                placeholder="Leave a message here"
                                id="message"
                                style={{ height: "80px" }}
                                ></textarea>
                                <label htmlFor="message">Message</label>
                            </div>
                            </div>

                            <div className="col-12">
                            <button className="btn btn-primary py-3 px-5" type="submit">
                                Get Appointment
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}