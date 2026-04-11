import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex">
      
      {/* Left Side (Branding) */}
      <div className="hidden md:flex w-1/2 bg-[#1C2536] text-white flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold mb-4">工事管理システム</h1>

        <p className="text-gray-400 text-sm">
          Construction Admin Dashboard
        </p>

        <div className="mt-10 text-gray-500 text-sm text-center">
          <p>Manage attendance, payroll, and cost</p>
          <p>all in one place.</p>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          
          <h2 className="text-2xl font-bold text-[#1C2536] mb-6">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-emerald-400">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-emerald-400">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition duration-200">
            <Link to='/dashboard'>Login</Link>
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-6">
            © 2026 Construction Admin System
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;