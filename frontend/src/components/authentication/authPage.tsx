import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./authLoginPage";
import RegisterPage from "./authRegisterPage";
const url = import.meta.env.VITE_GATEWAY_URL

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  return (

    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-3 dark:bg-gray-900">
      {/* Shrunk max-w to xs and tightened padding */}
      <div className="w-full max-w-xs bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 transition-all 
      duration-200 dark:bg-gray-800 dark:border-gray-700">

        {/* Compact Form Injector */}
        {isLogin ? <LoginPage /> : <RegisterPage />}

        {/* Compact Minimalist Divider */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-400"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-400 font-medium tracking-wider">Or</span>
          </div>
        </div>

        {/* Compact Footer Footer Switching Hook */}
        <div className="text-center flex flex-col items-center gap-1.5 ">
          <div className="flex items-center gap-1 text-[11px]">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => navigate(isLogin ? "/register" : "/login")}
              className={`font-semibold hover:underline focus:outline-none transition-all ${isLogin ? "text-emerald-600" : "text-blue-600"
                }`}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>

          {/* Scaled down Google Button to match the mini layout */}
          <button
            className="w-full text-sm font-medium bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-1.5 pr-5 transition-all active:scale-[0.98] flex items-center justify-between gap-3 mt-1"
            onClick={() => { window.location.href = `${url}/auth/google` }}
          >
            {/* White circle wrapper for the icon */}
            <div className="bg-white dark:bg-gray-600 p-2 rounded-full shadow-sm flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 488 512">
                <path fill="#EA4335" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
            </div>
            <span className="grow text-center font-medium tracking-wide">Continue with Google</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;