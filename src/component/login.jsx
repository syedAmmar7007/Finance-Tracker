import { useForm } from "react-hook-form";
import { useAuth } from "../store/tracker-store";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      let message = "Login failed. Please try again.";
      switch (error.code) {
        case "auth/user-not-found":
          message = "No account found with this email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password.";
          break;
        case "auth/invalid-email":
          message = "Invalid email format.";
          break;
        case "auth/too-many-requests":
          message = "Too many attempts. Try again later.";
          break;
      }
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9] px-4">
      <div className="w-full max-w-md bg-white border border-[#E3E7E5] rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center bg-linear-to-r from-green-500 to-teal-400 bg-clip-text text-transparent mb-1">
          Welcome Back
        </h1>
        <p className="text-center text-sm bg-linear-to-r from-green-400 to-teal-300 bg-clip-text text-transparent mb-6">
          Log in to manage your finances
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-[#64748B] mb-1">
              Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg
              border border-[#E3E7E5] bg-white
              text-[#0F172A] placeholder-[#94A3B8]
              focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-[#64748B] mb-1">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="password"
              className="w-full px-4 py-3 rounded-lg
              border border-[#E3E7E5] bg-white
              text-[#0F172A] placeholder-[#94A3B8]
              focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-lg font-semibold text-white
              ${loading ? "bg-[#A7F3D0] text-[#065F46] cursor-not-allowed" : "bg-[#16A34A] hover:bg-[#15803D] transition"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-[#64748B] mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#0D9488] hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
