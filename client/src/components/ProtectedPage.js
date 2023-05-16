import React, { useEffect } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../api/users";
import { useNavigate } from "react-router-dom";

function ProtectedPage({ children }) {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  console.log(children);

  const validatedToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validatedToken();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {user && (
        <div className="p-5">
          {user.name}
          {children}
        </div>
      )}
    </div>
  );
}

export default ProtectedPage;
