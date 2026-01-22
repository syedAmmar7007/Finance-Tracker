import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/tracker-store";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const password = watch("password");

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      await signup(data);
      reset();
      alert("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already registered. Please login.");
      } else if (err.code === "auth/weak-password") {
        alert("Password must be at least 6 characters.");
      } else {
        alert("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9] px-4">
      <div className="w-full max-w-md bg-white border border-[#E3E7E5] rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center bg-linear-to-r from-green-500 to-teal-400 bg-clip-text text-transparent mb-1">
          Create account
        </h1>
        <p className="text-center text-sm bg-linear-to-r from-green-400 to-teal-300 bg-clip-text text-transparent mb-6">
          Manage your income & expenses
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-[#64748B] mb-1">
              Full Name
            </label>
            <input
              placeholder="Full Name"
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-[#E3E7E5] bg-white text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#64748B] mb-1">Email</label>
            <input
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-[#E3E7E5] bg-white text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#64748B] mb-1">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-[#E3E7E5] bg-white text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#64748B] mb-1">
              Confirm Password
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                validate: (v) => v === password || "Passwords do not match",
              })}
              className="w-full px-4 py-3 rounded-lg border border-[#E3E7E5] bg-white text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#64748B] mb-1">
              Monthly Budget (optional)
            </label>
            <input
              placeholder="Monthly Budget"
              type="number"
              {...register("monthlyBudget")}
              className="w-full px-4 py-3 rounded-lg border border-[#E3E7E5] bg-white text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-lg font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-[#64748B] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0D9488] font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
