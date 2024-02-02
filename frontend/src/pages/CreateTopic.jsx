import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useResponseContext } from "../contexts/MessageContext";
import { NavLink } from "react-router-dom";

const CreateTopic = () => {
  const [postMessage, setPostMessage] = useState({
    titre: "",
    contenuMessage: "",
    categorieId: "",
  });
  const { updateResponseMessages } = useResponseContext();

  const handlePostMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3310/api/messages",
        postMessage
      );
      setTimeout(() => {
        toast.success("Message posté");
      }, 3000);

      updateResponseMessages(response.data);
    } catch (e) {
      console.error("Error post message:", e);
    }
  };

  return (
    <div className="containerCreateTopic">
      <div className="containerInputs">
        <label className="label">Titre</label>
        <input
          className="input"
          type="text"
          value={postMessage.titre}
          onChange={(e) =>
            setPostMessage({ ...postMessage, titre: e.target.value })
          }
        />
        <label className="label">Contenu du message</label>
        <textarea
          className="input"
          type="text"
          value={postMessage.contenuMessage}
          onChange={(e) =>
            setPostMessage({ ...postMessage, contenuMessage: e.target.value })
          }
        />
        <select
          className="input"
          value={postMessage.categorieId}
          onChange={(e) =>
            setPostMessage({ ...postMessage, categorieId: e.target.value })
          }
        >
          <option className="option">Entretien et réparation</option>
          <option className="option">Les Motos</option>
          <option className="option">Balade et rencontre</option>
        </select>
      </div>
      <NavLink to="/Home">
        <button className="postButton" onClick={handlePostMessage}>
          Poster le message
        </button>
      </NavLink>
    </div>
  );
};

export default CreateTopic;
