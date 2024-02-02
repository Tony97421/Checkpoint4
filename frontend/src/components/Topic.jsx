import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useResponseContext } from "../contexts/MessageContext";

const Topic = ({ categorie }) => {
  const [messages, setMessages] = useState([]);
  const { responseMessages, updateResponseMessages } = useResponseContext();
  const [usernames, setUsernames] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3310/api/messages/categorie/${categorie}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchUtilisateur = async (utilisateurId) => {
    try {
      const response = await axios.get(
        `http://localhost:3310/api/users/${utilisateurId}`
      );
      return response.data.pseudo;
    } catch (e) {
      console.error("Error fetching user:", e);
      return "Utilisateur inconnu";
    }
  };

  useEffect(() => {
    fetchData();
  }, [categorie, responseMessages]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernamesMap = {};
      for (const message of messages) {
        if (message.utilisateurId) {
          usernamesMap[message.utilisateurId] = await fetchUtilisateur(
            message.utilisateurId
          );
        }
      }
      setUsernames(usernamesMap);
    };

    fetchUsernames();
  }, [messages]);

  return (
    <div className="containerTopic">
      <div className="containerMessage">
        <h4 className="sujets">{categorie}</h4>
        {messages.map((message) => (
          <NavLink
            to={`/Reponse/${message.id}`}
            key={message.id}
            state={{ message }}
          >
            <div className="topic" key={message.id}>
              <h5 className="messageTitle">{message?.titre}</h5>
              <p className="messageContent">{message.contenuMessage}</p>
              {message?.utilisateurId && (
                <p className="messageUser">
                  De : {usernames[message.utilisateurId]}
                </p>
              )}
            </div>
          </NavLink>
        ))}
      </div>
      <NavLink to="/Crée-un-topic">
        <button className="buttonCreateTopic" type="button">
          Crée un topic
        </button>
      </NavLink>
    </div>
  );
};

export default Topic;
