import { useState } from "react";

const TwoFactorAuthForm = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Simulate API call to send verification code
  const sendVerificationCode = async () => {
    if (!email) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch("/api/send-verification-code", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setIsCodeSent(true);
        setErrorMessage("");
        console.log("Code sent successfully to your email!");
      } else {
        setErrorMessage("Failed to send verification code.");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      setErrorMessage("Error sending verification code.");
    }
  };

  // Simulate API call to verify the code
  const verifyCode = async () => {
    if (!code) {
      setErrorMessage("Please enter the verification code.");
      return;
    }
    try {
      const response = await fetch("/api/verify-2fa-code", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        console.log("Code verified!");
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid verification code.");
      }
    } catch (error) {
      console.error("Error verifying the code:", error);
      setErrorMessage("Error verifying the code.");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Two-Factor Authentication</h2>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded-md focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isCodeSent}
        />
      </div>

      {/* Send Code Button */}
      {!isCodeSent && (
        <button
          onClick={sendVerificationCode}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Send Verification Code
        </button>
      )}

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      {/* Code Input */}
      {isCodeSent && (
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="code">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            placeholder="Enter the code sent to your email"
            className="w-full p-2 border rounded-md focus:outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {/* Verify Code Button */}
          <button
            onClick={verifyCode}
            className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
          >
            Verify Code
          </button>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuthForm;
