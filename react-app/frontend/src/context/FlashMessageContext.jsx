import { createContext, useContext, useState } from "react";

const FlashMessageContext = createContext();

export const useFlashMessage = () => useContext(FlashMessageContext);

export const FlashMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <FlashMessageContext.Provider value={{ message, showMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
