import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink, useNavigate } from "react-router-dom";
import Inscription from "./Inscription";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Connection = () => {
  const [showInscription, setShowInscription] = useState(false);
  const [user, setUser] = useState({
    pseudo: "",
    password: "",
  });
  const navigate = useNavigate();

  const { updateUser } = useUser();

  const handleNavLinkClick = () => {
    setShowInscription(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3310/api/login", user);

      if (result.status === 200) {
        toast.success("Bienvenue" + " " + user.pseudo);
        updateUser(result.data.user);
        setTimeout(() => {
          navigate("/Home");
        }, 3000);
      } else {
        toast.error("Pseudo ou mot de passe incorrect");
        console.error("error login");
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div>
      <CSSTransition
        in={!showInscription}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <div className="containerConexion">
          <div className="containerInputs">
            <input
              className="inputConexion"
              type="text"
              placeholder="Pseudo"
              value={user.pseudo}
              onChange={(e) => setUser({ ...user, pseudo: e.target.value })}
            />
            <input
              className="inputConexion"
              type="password"
              placeholder="Mot de passe"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button className="buttonConexion" onClick={handleLogin}>
              Connexion
            </button>
            <NavLink to="/Inscription" onClick={handleNavLinkClick}>
              <p>Pas de compte ?</p>
            </NavLink>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={showInscription}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <Inscription />
      </CSSTransition>
    </div>
  );
};

export default Connection;
