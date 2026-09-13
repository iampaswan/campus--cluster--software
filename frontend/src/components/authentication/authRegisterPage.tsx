import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRegister } from "../../configuration/authConfiguration";

const RegisterPage: React.FC = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !email || !password) {
         alert("All fields are required.");
         return;
      }

      try {
         await authRegister({ name, email, password });
         alert("Registration successful. You can login now.");
         navigate("/login");
      } catch (err: any) {
         alert(err.response?.data?.message || "Registration failed");
      }
   };

   return (
      <div className="w-full">
         <div className="mb-4 text-left">
            <h2 className="text-xl text-center font-bold text-gray-800 tracking-tight dark:text-white">Registration</h2>
         </div>

         <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div>
               <label className="block text-[11px] font-medium text-gray-500 mb-1">
                  Name
               </label>
               <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-9 px-3 rounded-lg border text-xs transition-all duration-150 focus:outline-none focus:ring-2
  bg-gray-50 text-gray-800 border-gray-200 placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20
  dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500 dark:focus:bg-gray-900 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>

            <div>
               <label className="block text-[11px] font-medium text-gray-500 mb-1">
                  Email
               </label>
               <input
                  type="email"
                  placeholder="fullname@gmail.com"
                  className="w-full h-9 px-3 rounded-lg border text-xs transition-all duration-150 focus:outline-none focus:ring-2
  bg-gray-50 text-gray-800 border-gray-200 placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20
  dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500 dark:focus:bg-gray-900 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>

            <div>
               <label className="block text-[11px] font-medium text-gray-500 mb-1">
                  Password
               </label>
               <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full h-9 px-3 rounded-lg border text-xs transition-all duration-150 focus:outline-none focus:ring-2
  bg-gray-50 text-gray-800 border-gray-200 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20
  dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500 dark:focus:bg-gray-900 dark:focus:border-green-400 dark:focus:ring-green-400/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <button
               type="submit"
               className="w-full h-9 font-medium text-white px-4 rounded-lg text-xs cursor-pointer bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 transition-all duration-150 mt-1"
            >
               Create Account
            </button>
         </form>
      </div>
   );
};

export default RegisterPage;