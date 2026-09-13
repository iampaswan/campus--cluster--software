import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Power } from "lucide-react";

import { ThemeToggle } from "../../utils/theme-toggle";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  console.log("user logged in ", user)


  const handleLogout = async () => {

    dispatch(logout());
    navigate("/", { replace: true });
  };




  return (
    <div className="h-[6vh] bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="flex flex-row justify-between items-center dark:text-white
          px-4 py-2 w-full text-center border-dark:border-b-white">

        <h1 className="text-md font-bold">
          CampusCluster
        </h1>

        <div className="flex flex-row justify-center items-center gap-4 ">


          <ThemeToggle />


          <p className="text-sm text-gray-700 dark:text-gray-300 ">
            {user?.name}
          </p>

          <button
            onClick={handleLogout}
            className=" transition p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"

          >
            <Power size={15} />
          </button>
        </div>



      </div>
    </div>
  );

};


