import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/header";

function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    last_name: "",
    phone: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Helper function for errors
  const renderError = (field) => {
    return error[field]?.map((err, i) => (
      <div key={i} style={styles.fieldError}>
        {err}
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError({});
    setLoading(true);

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/register/",
        form
      );

      setMessage(res.data.message);

      setForm({
        username: "",
        email: "",
        password: "",
        password2: "",
        last_name: "",
        phone: ""
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {

      if (err.response && err.response.data) {
        setError(err.response.data.errors);
        console.log(err.response.data);
      }

    } finally {
      setLoading(false);
    }
  };

  // ── Styles ────────────────────────────────────────────────────
  const styles = {
    root: {
      background: "#07101f",
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
    },
    card: {
      background: "#0d1a2e",
      border: "1.5px solid #4a9eff",
      borderRadius: "20px",
      padding: "40px 36px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 0 36px rgba(74,158,255,0.18), 0 0 0 1.5px #4a9eff",
    },
    title: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: "24px",
      fontWeight: 800,
      color: "#ffffff",
      marginBottom: "24px",
      textAlign: "center",
      letterSpacing: "0.3px",
    },
    alertSuccess: {
      background: "rgba(74,158,255,0.15)",
      border: "1px solid #2a7aff",
      borderRadius: "8px",
      padding: "10px 14px",
      color: "#a0d0ff",
      fontSize: "13px",
      marginBottom: "16px",
    },
    fieldGroup: {
      marginBottom: "4px",
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
      marginBottom: "2px",
      boxSizing: "border-box",
    },
    fieldError: {
      color: "#ff7a7a",
      fontSize: "11px",
      marginBottom: "6px",
      paddingLeft: "4px",
    },
    btnRegister: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      background: "#2a7aff",
      border: "none",
      borderRadius: "10px",
      color: "#ffffff",
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 800,
      fontSize: "15px",
      cursor: "pointer",
      letterSpacing: "0.5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
    },
    spinner: {
      width: "14px",
      height: "14px",
      border: "2px solid rgba(255,255,255,0.3)",
      borderTop: "2px solid #ffffff",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
      display: "inline-block",
      flexShrink: 0,
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "20px 0 16px",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "#1a3050",
    },
    dividerText: {
      color: "#3a5a80",
      fontSize: "11px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    },
    twoCol: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
    },
  };

  return (

    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Poppins:wght@300;400;600;700&display=swap');

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .reg-input:focus {
          border-color: #4a9eff !important;
          box-shadow: 0 0 0 3px rgba(74,158,255,0.14) !important;
        }

        .reg-input::placeholder {
          color: #1e3550;
        }

        .btn-register:hover:not(:disabled) {
          background: #1a6aff !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(74,158,255,0.45);
        }

        .btn-register:active:not(:disabled) {
          transform: translateY(0) !important;
        }

        .btn-register:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
      `}</style>

      {/* <Header /> */}

      <div style={styles.root}>
        <div style={styles.main}>
          <div style={styles.card}>

            <h3 style={styles.title}>Create Account</h3>

            {/* ── YOUR EXISTING success message ── */}
            {message && (
              <div style={styles.alertSuccess}>
                {message}
              </div>
            )}

            {/* ── YOUR EXISTING form — all handlers unchanged ── */}
            <form onSubmit={handleSubmit}>

              {/* Row 1: Username + Last Name */}
              <div style={styles.twoCol}>
                <div style={styles.fieldGroup}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="reg-input"
                    style={styles.input}
                    value={form.username}
                    onChange={handleChange}
                  />
                  {renderError("username")}
                </div>

                <div style={styles.fieldGroup}>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="reg-input"
                    style={styles.input}
                    value={form.last_name}
                    onChange={handleChange}
                  />
                  {renderError("last_name")}
                </div>
              </div>

              {/* Email */}
              <div style={styles.fieldGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="reg-input"
                  style={styles.input}
                  value={form.email}
                  onChange={handleChange}
                />
                {renderError("email")}
              </div>

              {/* Phone */}
              <div style={styles.fieldGroup}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="reg-input"
                  style={styles.input}
                  value={form.phone}
                  onChange={handleChange}
                />
                {renderError("phone")}
              </div>

              <div style={styles.divider}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>Set Password</span>
                <div style={styles.dividerLine} />
              </div>

              {/* Row 2: Password + Confirm Password */}
              <div style={styles.twoCol}>
                <div style={styles.fieldGroup}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="reg-input"
                    style={styles.input}
                    value={form.password}
                    onChange={handleChange}
                  />
                  {renderError("password")}
                </div>

                <div style={styles.fieldGroup}>
                  <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    className="reg-input"
                    style={styles.input}
                    value={form.password2}
                    onChange={handleChange}
                  />
                  {renderError("password2")}
                </div>
              </div>

              {/* ── YOUR EXISTING submit button with spinner ── */}
              <button
                className="btn-register"
                style={styles.btnRegister}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span style={styles.spinner}></span>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>

            </form>

          </div>
        </div>
      </div>

    </>

  );
}

export default Register;