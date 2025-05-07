import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import useErrorHandler from "../../hooks/useErrorHandler.jsx";
import auth from "../../APIs/auth.js";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";

function UserAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useErrorHandler();
  const navigate = useNavigate();
  const handleSignup = async (user) => {
    setIsLoading(true);
    try {
      await auth.signupUser(user);
      //   window.location.href = "/";
      navigate("/");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (user) => {
    setIsLoading(true);
    try {
      await auth.loginUser(user);
      //   window.location.href = "/";
      navigate("/");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "100vh",
            width: "100%",
            margin: "20px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="signup" />} />
        <Route
          path="signup"
          element={
            <div className="auth-form">
              <SignupForm onSubmit={handleSignup} />
            </div>
          }
        />
        <Route
          path="login"
          element={
            <div className="auth-form">
              <LoginForm onSubmit={handleLogin} />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default UserAuth;
