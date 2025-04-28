import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/component/UI/Input";
import Button from "@/component/UI/Button";
import { IoArrowBack } from "react-icons/io5";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // ✅ Simulate API call with delay
    setTimeout(() => {
      console.log("Mock API: Reset link sent to", email);
      setShowPopup(true);
      setTimer(120);
      setIsSubmitting(false);
    }, 1000); // simulate 1 second delay
  };

  const handleResend = () => {
    setTimer(120);
    handleSubmit(new Event("submit")); // simulate a new form submit
  };

  useEffect(() => {
    let interval = null;
    if (showPopup && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showPopup, timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-20 relative">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
        <IoArrowBack
          size={22}
          className="text-green-600 absolute top-5 left-5 cursor-pointer"
          onClick={() => navigate("/login")}
        />

        <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">
          Forgot Password
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-center text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>

      {/* ✅ Mocked Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center space-y-4 border border-green-200">
            <h3 className="text-lg font-semibold text-green-700">
              Check Your Email
            </h3>
            <p className="text-gray-600 text-sm">
              A password reset link was sent to <strong>{email}</strong>. Check
              your inbox or spam folder.
            </p>

            <Button
              variant="secondary"
              className="w-full"
              disabled={timer > 0}
              onClick={handleResend}
            >
              {timer > 0
                ? `Resend in ${Math.floor(timer / 60)
                    .toString()
                    .padStart(2, "0")}:${(timer % 60)
                    .toString()
                    .padStart(2, "0")}`
                : "Resend Reset Link"}
            </Button>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => setShowPopup(false)}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
