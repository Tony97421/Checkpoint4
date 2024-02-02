import React, { createContext, useContext, useState } from "react";

const ResponseContext = createContext();

export const useResponseContext = () => {
  return useContext(ResponseContext);
};

export const ResponseProvider = ({ children }) => {
  const [responseMessages, setResponseMessages] = useState([]);

  const updateResponseMessages = (newMessage) => {
    setResponseMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <ResponseContext.Provider
      value={{ responseMessages, updateResponseMessages }}
    >
      {children}
    </ResponseContext.Provider>
  );
};
