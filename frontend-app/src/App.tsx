import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/index";
import Login from "./pages/Login";
import Register from "./pages/register";
import AdminDashboard from "./Admin/pages/admin";
import AgentDashboard from "./Agent/pages/agent";
import PolicyDetail from "./pages/policy-detail";
import VehicleApplication from "./pages/application/VehicleApplication";
import HealthApplication from "./pages/application/HealthApplication";
import LifeApplication from "./pages/application/LifeApplication";
import HomeApplication from "./pages/application/HomeApplication";
import Payment from "./pages/payment";

import PrivateRoute from "../src/Auth/PrivateRoute";
import ScrollToTop from "../src/components/ScrollToTop";
import Spinner from "../src/components/spinner";

import { isTokenExpired, refreshAccessToken } from "./services/auth";
import { useEffect, useState } from "react";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const initAuth = async () =>{
      const token = localStorage.getItem("access");

      if(token && isTokenExpired(token)){
        const newToken = await refreshAccessToken();
        if(!newToken){
          localStorage.clear();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
          <Spinner isLoading={loading} />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/policy-detail/:policy_uuid" element={<PolicyDetail />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/vehicle-insurance/:policy_uuid"
          element={
            <PrivateRoute>
              <VehicleApplication />
            </PrivateRoute>
          }
        />

        <Route
          path="/health-insurance/:policy_uuid"
          element={
            <PrivateRoute>
              <HealthApplication />
            </PrivateRoute>
          }
        />

        <Route
          path="/life-insurance/:policy_uuid"
          element={
            <PrivateRoute>
              <LifeApplication />
            </PrivateRoute>
          }
        />

        <Route
          path="/home-insurance/:policy_uuid"
          element={
            <PrivateRoute>
              <HomeApplication />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/agent-dashboard"
          element={
            <PrivateRoute allowedRoles={["agent"]}>
              <AgentDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment/:policy_uuid"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;