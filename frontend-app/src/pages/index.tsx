import { useEffect, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import AOS from "aos";
import "aos/dist/aos.css";

import counterUp from "counterup2";

import Header from "../components/header";
import Footer from "../components/footer"; 
import Appointment from "../components/appointment";
import PolicyList from "../components/policy_list"


function Counter({ end }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) counterUp(ref.current, { duration: 2000, delay: 16 });
  }, []);
  return <span ref={ref}>{end}</span>;
}

export default function Home() {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Spinner */}
      {loading && (
        <div
          id="spinner"
          className="bg-white position-fixed top-50 start-50 translate-middle w-100 vh-100 d-flex align-items-center justify-content-center"
        >
          <div className="spinner-grow text-primary"></div>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="container-fluid p-0 mb-5">
        <Swiper 
          slidesPerView={1} 
          loop={true} 
          autoplay={{ delay: 4000 }} 
          modules={[Autoplay, Pagination]} 
          pagination={{ clickable: true }} 
        >
          <SwiperSlide>
            <div className="position-relative">
              <img
                className="w-100"
                src="/template/images/carousel-1.jpg"
                alt="Slide 1"
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <h1 className="display-3 text-dark mb-4" data-aos="slide-down">
                        Insurance Creates Wealth For Everyone
                      </h1>
                      <p className="fs-5 text-body mb-5">
                        Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                        duo justo magna dolore erat amet
                      </p>
                      <a href="#" className="btn btn-primary py-3 px-5">
                        More Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="position-relative">
              <img
                className="w-100"
                src="/template/images/carousel-2.jpg"
                alt="Slide 2"
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <h1 className="display-3 text-dark mb-4" data-aos="slide-down">
                        The Best Insurance Begins Here
                      </h1>
                      <p className="fs-5 text-body mb-5">
                        Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                        duo justo magna dolore erat amet
                      </p>
                      <a href="#" className="btn btn-primary py-3 px-5">
                        More Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Facts / Counters */}
      <div className="container-fluid overflow-hidden my-5 px-lg-0">
        <div className="container facts px-lg-0">
          <div className="row g-0 mx-lg-0">
            <div className="col-lg-6 facts-text" data-aos="fade-up">
              <div className="h-100 px-4 ps-lg-0">
                <h1 className="text-white mb-4">
                  For Individuals And Organisations
                </h1>
                <p className="text-light mb-5">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                  diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                  lorem sit clita duo justo magna dolore erat amet
                </p>
                <a
                  href="#"
                  className="align-self-start btn btn-secondary py-3 px-5"
                >
                  More Details
                </a>
              </div>
            </div>
            <div className="col-lg-6 facts-counter" data-aos="fade-up">
              <div className="h-100 px-4 pe-lg-0">
                <div className="row g-5">
                  <div className="col-sm-6 text-center text-light">
                    <h1 className="display-5">
                      <Counter end={1234} />
                    </h1>
                    <p className="fs-5 text-primary">Happy Clients</p>
                  </div>
                  <div className="col-sm-6 text-center text-light">
                    <h1 className="display-5">
                      <Counter end={1234} />
                    </h1>
                    <p className="fs-5 text-primary">Projects Succeed</p>
                  </div>
                  <div className="col-sm-6 text-center text-light">
                    <h1 className="display-5">
                      <Counter end={1234} />
                    </h1>
                    <p className="fs-5 text-primary">Awards Achieved</p>
                  </div>
                  <div className="col-sm-6 text-center text-light">
                    <h1 className="display-5">
                      <Counter end={1234} />
                    </h1>
                    <p className="fs-5 text-primary">Team Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h1 className="display-6 mb-5">
                Few Reasons Why People Choosing Us!
              </h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                lorem sit clita duo justo magna dolore erat amet
              </p>
              <div className="row g-3">
                {[
                  { icon: "icon-06-primary.png", title: "Easy Process", delay: 100 },
                  { icon: "icon-03-primary.png", title: "Fast Delivery", delay: 200 },
                  { icon: "icon-04-primary.png", title: "Policy Controlling", delay: 300 },
                  { icon: "icon-07-primary.png", title: "Money Saving", delay: 400 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="col-sm-6"
                    data-aos="fade-up"
                    data-aos-delay={item.delay}
                  >
                    <div className="bg-light rounded h-100 p-3">
                      <div className="bg-white d-flex flex-column justify-content-center text-center rounded h-100 py-4 px-3">
                        <img
                          className="align-self-center mb-3"
                          src={`/template/images/icon/${item.icon}`}
                          alt=""
                        />
                        <h5 className="mb-0">{item.title}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div
                className="position-relative rounded overflow-hidden h-100"
                style={{ minHeight: "400px" }}
              >
                <img
                  className="position-absolute w-100 h-100"
                  src="/template/images/feature.jpg"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="policies">
        <PolicyList/>
      </section>

      {/* Appointment Section */}
      <Appointment />

      {/* Team Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: "500px" }}>
            <h1 className="display-6 mb-5">Meet Our Professional Team Members</h1>
          </div>
          <div className="row g-4">
            {[
              { img: "team-1.jpg" },
              { img: "team-2.jpg" },
              { img: "team-3.jpg" },
              { img: "team-4.jpg" },
            ].map((member, idx) => (
              <div key={idx} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={100 + idx * 200}>
                <div className="team-item rounded">
                  <img className="img-fluid" src={`/template/images/${member.img}`} alt="" />
                  <div className="text-center p-4">
                    <h5>Full Name</h5>
                    <span>Designation</span>
                  </div>
                  <div className="team-text text-center bg-white p-4">
                    <h5>Full Name</h5>
                    <p>Designation</p>
                    <div className="d-flex justify-content-center">
                      {["twitter", "facebook-f", "youtube", "linkedin-in"].map((icon, i) => (
                        <a key={i} className="btn btn-square btn-light m-1" href="#">
                          <i className={`fab fa-${icon}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial   */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: "500px" }}>
            <h1 className="display-6 mb-5">
              What They Say About Our Insurance
            </h1>
          </div>

          <div className="row g-5">
            
            {/* Left Images */}
            <div className="col-lg-3 d-none d-lg-block">
              <div className="testimonial-left h-100">
                <img className="img-fluid animated pulse infinite"
                  src="/template/images/testimonial-1.jpg" alt="" />
                <img className="img-fluid animated pulse infinite"
                  src="/template/images/testimonial-2.jpg" alt="" />
                <img className="img-fluid animated pulse infinite"
                  src="/template/images/testimonial-3.jpg" alt="" />
              </div>
            </div>

            {/* Center Swiper */}
            <div className="col-lg-6">

              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
              >
                
                <SwiperSlide>
                  <div className="testimonial-item text-center">
                    <img className="img-fluid rounded mx-auto mb-4"
                      src="/template/images/testimonial-1.jpg" alt="" />
                    <p className="fs-5">
                      Dolores sed duo clita tempor justo dolor et stet lorem kasd
                      labore dolore lorem ipsum.
                    </p>
                    <h5>Client Name</h5>
                    <span>Profession</span>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="testimonial-item text-center">
                    <img className="img-fluid rounded mx-auto mb-4"
                      src="/template/images/testimonial-2.jpg" alt="" />
                    <p className="fs-5">
                      Dolores sed duo clita tempor justo dolor et stet lorem kasd
                      labore dolore lorem ipsum.
                    </p>
                    <h5>Client Name</h5>
                    <span>Profession</span>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="testimonial-item text-center">
                    <img className="img-fluid rounded mx-auto mb-4"
                      src="/template/images/testimonial-3.jpg" alt="" />
                    <p className="fs-5">
                      Dolores sed duo clita tempor justo dolor et stet lorem kasd
                      labore dolore lorem ipsum.
                    </p>
                    <h5>Client Name</h5>
                    <span>Profession</span>
                  </div>
                </SwiperSlide>

              </Swiper>

            </div>

            {/* Right Images */}
            <div className="col-lg-3 d-none d-lg-block">
              <div className="testimonial-right h-100">
                <img className="img-fluid animated pulse infinite"
                  src="/template/images/testimonial-1.jpg" alt="" />
                <img className="img-fluid animated pulse infinite"
                  src="/template/images/testimonial-2.jpg" alt="" />
                <img className="img-fluid animated pulse infinite"
                  src="/template/images/testimonial-3.jpg" alt="" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}