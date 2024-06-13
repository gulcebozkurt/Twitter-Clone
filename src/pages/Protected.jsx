import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";

const Protected = () => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        setIsAuth(user ? true : false);
      },
      []
    );
  });

  //yetkisi yoksa kullanıcıyı logine yönlendir
  if (isAuth === false) return <Navigate to="/" />;

  return (
    <div className="h-screen grid place-items-center">
      <Outlet />
    </div>
  );
};

export default Protected;
