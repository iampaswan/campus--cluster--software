import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../store/authSlice";

import { getMe } from "../../configuration/authConfiguration";


const OAuthSuccess = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchUser = async () => {

      const params =
        new URLSearchParams(
          window.location.search
        );

      const accessToken =
        params.get("accessToken");


      if (!accessToken) {
        navigate("/login");
        return;
      }

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      try {
        console.log("acces token", accessToken)

        const response = await getMe();
        console.log(response.data);

        dispatch(
          login({
            user: response.data,
            token: accessToken,
            refreshToken: "",
          })
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data
          )
        );

        navigate("/dashboard");

      } catch (error) {

        console.error(error);

        navigate("/login");

      }

    };

    fetchUser();

  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-3 text-gray-700 text-lg font-medium">
      Signing in...
    </div>
  );
};

export default OAuthSuccess;