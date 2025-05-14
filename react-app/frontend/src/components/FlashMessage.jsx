import { useFlashMessage } from "../context/FlashMessageContext";

const FlashMessage = () => {
  const { message } = useFlashMessage();

  if (!message) return null;

  return (
    <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-2 text-white rounded-md shadow-md ${
      message.type === "success" ? "bg-green-500" : "bg-red-500"
    }`}>
      {message.text}
    </div>
  );
};

export default FlashMessage;
