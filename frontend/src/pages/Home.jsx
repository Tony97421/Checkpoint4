import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [popUp, setPopUp] = useState(false);

  const handleLogOut = () => {
    logout(navigate);
    setPopUp(false);
  };
  return (
    <div className="containerHome">
      <h1 className="forumMoto">Forum Moto</h1>
      <div className="header">
        {user ? (
          <h3 className="bonjour">Bonjour, {user.pseudo}</h3>
        ) : (
          <h3 className="bonjour">Bonjour et bienvenue</h3>
        )}
        <button className="buttonSettings" onClick={() => setPopUp(!popUp)}>
          <img className="settings" src="/settings.png" alt="settings" />
        </button>
        <div>
          {popUp && (
            <div className="popUp">
              <button className="deco" type="button" onClick={handleLogOut}>
                <h2 className="deconecte"> Se déconnecter</h2>
              </button>

              <NavLink to="/Settings">
                <h2 className="popUpText">Settings</h2>
              </NavLink>
            </div>
          )}
        </div>
        {/* </NavLink> */}
      </div>
      <div className="conatinerTopic">
        <NavLink to="/Balade-et-rencontre">
          <h2 className="topic">Balade moto et rencontre</h2>
        </NavLink>
        <NavLink to="/Les-Motos">
          <h2 className="topic">Les motos</h2>
        </NavLink>
        <NavLink to="/Entretien-et-réparation">
          <h2 className="topic">Entretient réparation</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
