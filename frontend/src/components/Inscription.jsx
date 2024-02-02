import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Connection from "./Connection";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const Inscription = () => {
  const [showConnection, setShowConnection] = useState(false);
  const { updateUser } = useUser();
  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleNavLinkClickCo = () => {
    setShowConnection(!showConnection);
  };

  const handlePostUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3310/api/users",
        user
      );
      if (response.status === 201) {
        toast.success("Bienvenue" + " " + user.pseudo);
        updateUser(response.data.user);
        setTimeout(() => {
          navigate("/Home");
        }, 3000);
      } else {
        console.error("error registration");
      }
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 409) {
        toast.error("Ce pseudo ou cet email est déjà utilisé");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePostUser();
  };

  return (
    <div>
      <CSSTransition
        in={!showConnection}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <div className="containerInscription">
          <div className="containerInputs">
            <form
              className="form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input
                className="inputInscription"
                type="text"
                placeholder="Pseudo"
                name="pseudo"
                value={user.pseudo}
                onChange={handleChange}
              />
              <input
                className="inputInscription"
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <input
                className="inputInscription"
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              {/* <NavLink to="/Home"> */}
              <button className="buttonInscription" type="Submit">
                Inscription
              </button>
              {/* </NavLink> */}
              <NavLink to="/Connection" onClick={handleNavLinkClickCo}>
                <p>J'ai déjà un compte</p>
              </NavLink>
            </form>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={showConnection}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <Connection />
      </CSSTransition>
    </div>
  );
};

export default Inscription;
