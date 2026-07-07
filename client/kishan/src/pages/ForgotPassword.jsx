import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/forgot-password", { email, secretAnswer, newPassword });
      setMessage(res.data.message + " Redirecting to Login...");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update recovery items.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gray-50 text-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Reset Password</h2>
        <p className="text-sm text-gray-500 mb-6">Verify your profile metadata to select a new secret entry key.</p>

        {error && <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-4 font-medium">⚠️ {error}</div>}
        {message && <div className="bg-emerald-50 text-emerald-600 text-sm p-4 rounded-xl mb-4 font-medium">✅ {message}</div>}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">Account Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Security Question</label>
            <p className="text-xs text-blue-600 font-medium mb-1.5">What is your favorite programming language?</p>
            <input
              type="text"
              required
              placeholder="Your answer"
              value={secretAnswer}
              onChange={(e) => setSecretAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold text-sm transition shadow-md">
            Reset Account Key
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-gray-800 underline">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;