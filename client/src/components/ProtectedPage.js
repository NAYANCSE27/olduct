import React, { useEffect } from "react";
import { Avatar, Badge, message } from "antd";
import { GetCurrentUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import Notifications from "./Notifications";
import { GetAllNotifications } from "../api/notifications";

function ProtectedPage({ children }) {
  // const [user, setUser] = React.useState({});
  const [notifications = [], setNotifications] = React.useState([]);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatedToken = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      if (response.success) {
        // setUser(response.data);
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllNotifications();
      dispatch(SetLoading(false));
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validatedToken();
      getNotifications();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        {/* header section */}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            OLDUCT
          </h1>

          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            {/* <i className="ri-shield-user-line"></i> */}
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => setShowNotifications(true)}
              className="cursor-pointer"
            >
              <Avatar
                size="medium"
                icon={<i className="ri-notification-3-line"></i>}
              />
            </Badge>
            <i
              className="ri-logout-box-r-line ml-7"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        {/* body section */}
        <div className="p-5">{children}</div>

        {
          <Notifications
            notifications={notifications}
            reloadNotifications={setNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
        }
      </div>
    )
  );
}

export default ProtectedPage;
