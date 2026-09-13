import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "../../store/authSlice";
import type { AppDispatch } from "../../store/store";
import { authLogin } from "../../configuration/authConfiguration";

const LoginPage: React.FC = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !password) {
         alert("Please enter both email and password");
         return;
      }

      try {
         const { data } = await authLogin({ email, password });
         const accessToken = data.accessToken;

         if (!accessToken) {
            throw new Error("Access token not received");
         }

         dispatch(
            loginAction({
               user: {
                  _id: data.user._id,
                  name: data.user.name,
                  email: data.user.email,
               },
               token: accessToken,
               refreshToken: "",
            })
         );

         localStorage.setItem("user", JSON.stringify(data.user));
         localStorage.setItem("accessToken", accessToken);

         navigate("/");
      } catch (err: any) {
         alert(err.response?.data?.message || err.message || "Login failed");
      }
   };

   return (
      <div className="w-full">
         <div className="mb-4 text-left">
            <h2 className="text-xl text-center font-bold text-gray-800 tracking-tight dark:text-white">Welcome</h2>
         </div>

         <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div>
               <label className="block text-[11px] font-medium text-gray-500 mb-1">
                  Email
               </label>
               <input
                  type="email"
                  placeholder="fullname@gmail.com"
                  className="w-full h-9 px-3 rounded-lg border text-xs transition-all duration-150 focus:outline-none focus:ring-2
  bg-gray-50 text-gray-800 border-gray-200 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20
  dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500 dark:focus:bg-gray-900 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
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
  dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500 dark:focus:bg-gray-900 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <button
               type="submit"
               className="w-full h-9 font-medium text-white px-4 rounded-lg text-xs cursor-pointer bg-blue-600 hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-150 mt-1"
            >
               Sign In
            </button>
         </form>
      </div>
   );
};

export default LoginPage;