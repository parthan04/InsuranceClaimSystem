import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "../components/header";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [lampOn, setLampOn] = useState(false);
    const [pulling, setPulling] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const dragStartY = useRef(0);
    const dragging = useRef(false);

    const navigate = useNavigate();

    // ── Lamp toggle ──────────────────────────────────────────────
    const toggleLamp = () => {
        setPulling(false);
        setTimeout(() => setPulling(true), 10);
        setTimeout(() => setPulling(false), 600);
        setLampOn((prev) => !prev);
    };

    // Drag-down to pull string
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging.current) return;
            if (e.clientY - dragStartY.current > 25) {
                dragging.current = false;
                toggleLamp();
            }
        };
        const handleMouseUp = () => { dragging.current = false; };
        const handleTouchMove = (e) => {
            if (!dragging.current) return;
            if (e.touches[0].clientY - dragStartY.current > 25) {
                dragging.current = false;
                toggleLamp();
            }
        };
        const handleTouchEnd = () => { dragging.current = false; };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    const onStringMouseDown = (e) => {
        dragStartY.current = e.clientY;
        dragging.current = true;
        e.preventDefault();
    };

    const onStringTouchStart = (e) => {
        dragStartY.current = e.touches[0].clientY;
        dragging.current = true;
    };

    // ── Form submit (YOUR EXISTING LOGIC — unchanged) ─────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/accounts/login/",
                { username, password }
            );

            setMessage(res.data.message);

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            const user = res.data.user;

            if (user.role === "admin") {
                navigate("/admin-dashboard");
            } else if (user.role === "agent") {
                navigate("/agent-dashboard");
            } else {
                navigate("/");
            }

        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || "Invalid Credentials");
            }
        }
    };

    // ── Lamp colors ───────────────────────────────────────────────
    const shadeColor     = lampOn ? "#c8deff" : "#1a1a2e";
    const rimColor       = lampOn ? "#a0c0f0" : "#131320";
    const tipColor       = lampOn ? "#ddeeff" : "#222235";
    const poleColor      = lampOn ? "#404060" : "#2a2a3a";
    const baseTopColor   = lampOn ? "#404060" : "#2e2e40";
    const baseBodyColor  = lampOn ? "#383858" : "#282838";
    const baseBottomColor = lampOn ? "#303050" : "#222230";

    // ── Inline styles (no external CSS needed) ────────────────────
    const styles = {
        root: {
            background: "#07102f",
            fontFamily: "'Poppins', sans-serif",
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
        },
        main: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            position: "relative",
            overflow: "hidden",
        },
        scene: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "60px",
            width: "100%",
            maxWidth: "820px",
            position: "relative",
        },
        lampWrap: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
            userSelect: "none",
        },
        lightCone: {
            position: "absolute",
            bottom: "68px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "90px solid transparent",
            borderRight: "90px solid transparent",
            borderTop: "120px solid rgba(100,170,255,0.35)",
            opacity: lampOn ? 1 : 0,
            transition: "opacity 0.6s ease",
            filter: "blur(14px)",
            pointerEvents: "none",
            zIndex: 0,
        },
        lampSvg: {
            position: "relative",
            zIndex: 2,
            width: "160px",
            height: "auto",
            filter: lampOn
                ? "drop-shadow(0 0 28px rgba(74,158,255,0.55))"
                : "drop-shadow(0 0 0px transparent)",
            transition: "filter 0.6s ease",
        },
        stringWrap: {
            position: "absolute",
            left: "50%",
            top: "193px",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 10,
            animation: pulling ? "pullDown 0.55s ease" : "none",
        },
        stringLine: {
            width: "2px",
            height: "60px",
            background: "linear-gradient(to bottom, #444, #999)",
            borderRadius: "1px",
        },
        stringBall: {
            width: "11px",
            height: "11px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #ccc, #666)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
            marginTop: "-1px",
        },
        floorGlow: {
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "30px",
            background: "radial-gradient(ellipse, rgba(74,158,255,0.3) 0%, transparent 70%)",
            opacity: lampOn ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
            zIndex: 1,
        },
        hint: {
            position: "absolute",
            bottom: "-36px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#1e3a5a",
            fontSize: "11px",
            whiteSpace: "nowrap",
            letterSpacing: "1px",
            textTransform: "uppercase",
            opacity: lampOn ? 0 : 1,
            transition: "opacity 0.4s",
        },
        // Login card
        loginCard: {
            background: "#0d1a2e",
            border: `1.5px solid ${lampOn ? "#4a9eff" : "#1a3050"}`,
            borderRadius: "20px",
            padding: "40px 36px",
            width: "320px",
            flexShrink: 0,
            opacity: lampOn ? 1 : 0,
            transform: lampOn ? "translateX(0) scale(1)" : "translateX(40px) scale(0.96)",
            pointerEvents: lampOn ? "all" : "none",
            transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease, border-color 0.6s ease",
            boxShadow: lampOn
                ? "0 0 36px rgba(74,158,255,0.18), 0 0 0 1.5px #4a9eff"
                : "none",
        },
        cardTitle: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: "22px",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "24px",
            textAlign: "center",
            letterSpacing: "0.3px",
        },
        fieldGroup: { marginBottom: "16px" },
        label: {
            display: "block",
            fontSize: "11px",
            fontWeight: 600,
            color: "#5a7aa0",
            marginBottom: "6px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
        },
        input: {
            width: "100%",
            background: "#07101f",
            border: "1.5px solid #1a3050",
            borderRadius: "10px",
            padding: "10px 14px",
            color: "#ffffff",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            outline: "none",
        },
        btnLogin: {
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            background: "#2a7aff",
            border: "none",
            borderRadius: "10px",
            color: "#ffffff",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: "15px",
            cursor: "pointer",
            letterSpacing: "0.5px",
        },
        alertSuccess: {
            background: "rgba(74,158,255,0.15)",
            border: "1px solid #2a7aff",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "#a0d0ff",
            fontSize: "13px",
            marginBottom: "14px",
        },
        alertDanger: {
            background: "rgba(255,80,80,0.12)",
            border: "1px solid #ff4a4a",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "#ffaaaa",
            fontSize: "13px",
            marginBottom: "14px",
        },
        registerRow: {
            display: "flex",
            alignItems: "center",
            marginTop: "14px",
            fontSize: "12px",
            color: "#5a7aa0",
            gap: "6px",
        },
        registerLink: {
            color: "#4a9eff",
            textDecoration: "none",
            fontWeight: 600,
        },
        forgot: {
            display: "block",
            textAlign: "center",
            marginTop: "10px",
            fontSize: "11px",
            color: "#5a7aa0",
            cursor: "pointer",
            textDecoration: "none",
        },
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Poppins:wght@300;400;600;700&display=swap');

                @keyframes pullDown {
                    0%   { transform: translateY(0); }
                    40%  { transform: translateY(28px); }
                    70%  { transform: translateY(10px); }
                    85%  { transform: translateY(18px); }
                    100% { transform: translateY(0); }
                }

                .string-ball-hover:hover { transform: scale(1.2); }

                .login-input:focus {
                    border-color: #4a9eff !important;
                    box-shadow: 0 0 0 3px rgba(74,158,255,0.14) !important;
                }

                .btn-login-lamp:hover {
                    background: #1a6aff !important;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 18px rgba(74,158,255,0.45);
                }
                .btn-login-lamp:active { transform: translateY(0) !important; }

                .forgot-link:hover { color: #4a9eff !important; }
                .register-link:hover { text-decoration: underline; }
            `}</style>

            <Header />

            <div style={styles.root}>
                <div style={styles.main}>
                    <div style={styles.scene}>

                        {/* ── LAMP SECTION ── */}
                        <div style={styles.lampWrap}>

                            {/* Light cone */}
                            <div style={styles.lightCone} />

                            {/* Lamp SVG */}
                            <svg
                                style={styles.lampSvg}
                                viewBox="0 0 160 260"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Shade */}
                                <path
                                    d="M30 110 L50 30 Q80 18 110 30 L130 110 Q80 120 30 110Z"
                                    fill={shadeColor}
                                    style={{ transition: "fill 0.5s ease" }}
                                />
                                <ellipse cx="80" cy="110" rx="51" ry="10"
                                    fill={rimColor}
                                    style={{ transition: "fill 0.5s ease" }}
                                />
                                <ellipse cx="80" cy="30" rx="31" ry="7"
                                    fill={tipColor}
                                    style={{ transition: "fill 0.5s ease" }}
                                />

                                {/* OFF face: dot eyes + flat mouth */}
                                <g style={{ opacity: lampOn ? 0 : 1, transition: "opacity 0.4s ease" }}>
                                    <circle cx="65" cy="72" r="3.5" fill="#2a2a4a" />
                                    <circle cx="95" cy="72" r="3.5" fill="#2a2a4a" />
                                    <line x1="71" y1="86" x2="89" y2="86"
                                        stroke="#2a2a4a" strokeWidth="2.5" strokeLinecap="round"
                                    />
                                </g>

                                {/* ON face: white dot eyes + subtle smile */}
                                <g style={{ opacity: lampOn ? 1 : 0, transition: "opacity 0.5s ease" }}>
                                    <circle cx="65" cy="72" r="4" fill="#ffffff" />
                                    <circle cx="66.5" cy="70.5" r="1.5" fill="#0a2040" />
                                    <circle cx="95" cy="72" r="4" fill="#ffffff" />
                                    <circle cx="96.5" cy="70.5" r="1.5" fill="#0a2040" />
                                    <path d="M72 85 Q80 90 88 85"
                                        stroke="#ffffff" strokeWidth="2"
                                        strokeLinecap="round" fill="none" opacity="0.7"
                                    />
                                </g>

                                {/* Pole */}
                                <rect x="76" y="110" width="8" height="95" rx="4"
                                    fill={poleColor}
                                    style={{ transition: "fill 0.5s ease" }}
                                />
                                <rect x="71" y="118" width="3" height="82" rx="1.5" fill="#222230" />

                                {/* Base */}
                                <ellipse cx="80" cy="207" rx="38" ry="9"
                                    fill={baseTopColor}
                                    style={{ transition: "fill 0.5s ease" }}
                                />
                                <rect x="42" y="207" width="76" height="12" rx="4"
                                    fill={baseBodyColor}
                                    style={{ transition: "fill 0.5s ease" }}
                                />
                                <ellipse cx="80" cy="219" rx="38" ry="9"
                                    fill={baseBottomColor}
                                    style={{ transition: "fill 0.5s ease" }}
                                />
                            </svg>

                            {/* Hanging string */}
                            <div
                                style={styles.stringWrap}
                                onClick={toggleLamp}
                                onMouseDown={onStringMouseDown}
                                onTouchStart={onStringTouchStart}
                            >
                                <div style={styles.stringLine} />
                                <div className="string-ball-hover" style={styles.stringBall} />
                            </div>

                            {/* Floor glow */}
                            <div style={styles.floorGlow} />

                            {/* Pull hint */}
                            <div style={styles.hint}>↑ pull the string</div>
                        </div>

                        {/* ── LOGIN CARD SECTION ── */}
                        <div style={styles.loginCard}>
                            <h3 style={styles.cardTitle}>Welcome Back</h3>

                            {/* YOUR EXISTING alerts */}
                            {message && (
                                <div style={styles.alertSuccess}>{message}</div>
                            )}
                            {error && (
                                <div style={styles.alertDanger}>{error}</div>
                            )}

                            {/* YOUR EXISTING form — only classNames replaced with style props */}
                            <form onSubmit={handleSubmit}>

                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Username</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        className="login-input"
                                        style={styles.input}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoComplete="off"
                                    />
                                </div>

                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="login-input"
                                        style={styles.input}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <span
                                    style={{
                                        position: "absolute",
                                        right: "50px",
                                        top: "202px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setShowPassword(!showPassword)}
                                    >
                                    {showPassword ? (
                                        <i className="fa fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa fa-eye"></i>
                                    )}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-login-lamp"
                                    style={styles.btnLogin}
                                >
                                    Login
                                </button>

                                <div style={styles.registerRow}>
                                    <p style={{ margin: 0 }}>Don't have account?</p>
                                    <Link
                                        to="/register"
                                        className="register-link"
                                        style={styles.registerLink}
                                    >
                                        Register Now
                                    </Link>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </>
    );
}

export default Login;