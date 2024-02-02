import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useUser();

  const [pseudo, setPseudo] = useState(user.pseudo);
  const [email, setEmail] = useState(user.email);

  const handleUpdateSettings = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3310/api/users/${user.id}`,
        {
          pseudo: pseudo,
          email: email,
        }
      );

      if (response.status === 200) {
        updateUser({
          ...user,
          pseudo: pseudo,
          email: email,
        });
        setTimeout(() => {
          toast.success("Modification réussie");
          navigate("/Home");
        }, 2000);
      } else {
        toast.error("Une erreur est survenue");
        console.error("Erreur lors de la mise à jour des paramètres");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3310/api/users/${user.id}`
      );
      if (response.status === 200) {
        setTimeout(() => {
          toast.success("Compte supprimé");
        }, 2000);
        logout(navigate);
      } else {
        toast.error("Une erreur est survenue");
        console.error("Erreur lors de la suppression du compte");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="containerSettings">
      <div className="containerInputs">
        <input
          className="input"
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder={user.pseudo}
        />
        <input
          className="input"
          type="email"
          placeholder={user.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          className="buttonValider"
          onClick={handleUpdateSettings}
        >
          Valider
        </button>
        <button
          type="button"
          className="buttonDelete"
          onClick={handleDeleteAccount}
        >
          Supprimer le compte
        </button>
      </div>
    </div>
  );
};

export default Settings;
