import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

const Header = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">
          vnote.gg
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {currentUser ? (
              <>
                <li>
                  <Link to="/notes" className="text-white">
                    Notlarım
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-white">
                    Çıkış Yap
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white">
                    Giriş Yap
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white">
                    Kayıt Ol
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
