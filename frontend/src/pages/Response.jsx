import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useResponseContext } from "../contexts/MessageContext";
import { toast } from "react-hot-toast";

const Response = () => {
  const location = useLocation();
  const message = location.state?.message;
  const navigate = useNavigate();
  const { updateResponseMessages } = useResponseContext();
  const [newMessage, setNewMessage] = useState("");

  const postMessage = async () => {
    try {
      const response = await axios.post("http://localhost:3310/api/messages", {
        categorie: message?.categorie,
        contenuMessage: newMessage,
        parentMessageId: message?.id,
      });

      // Rediriger vers la page Topic après avoir posté la réponse
      updateResponseMessages(response.data);
      toast.success("Message posté");
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  useEffect(() => {}, [location.state, message]);

  return (
    <div className="response-container">
      <div className="message-details">
        <h2 className="message-title">{message?.titre}</h2>
        <p className="message-content">{message?.contenuMessage}</p>
      </div>
      <div className="response-form">
        <textarea
          className="response-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <NavLink to={-1}>
          <button
            className="response-button"
            type="submit"
            onClick={postMessage}
          >
            Post Response
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Response;
