import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email"),
});

function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      alert("Check your inbox for a password reset link ✉️");
    } catch (err) {
      alert("Error ❌: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 to-orange-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold shadow-md transition ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white hover:opacity-90"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-4">
          <Link
            to="/"
            className="block w-full text-center py-2 rounded-lg font-semibold shadow-md transition bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white hover:opacity-90"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
