import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMessages } from "../../service/getMessages";
import { postMessage } from "../../service/postMessage";

interface Message {
  user: string;
  message: string;
}

interface ChatContextType {
  loading: boolean;
  messages: Message[];
  handleAddMessage: (message: Message) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    getMessages({
      idUser: 2,
      idRestaurant: 1,
      limit: 10,
      offset: 0,
    })
      .then((response) => {
        console.log("response", response);
        setMessages(
          response.reverse().map((message) => ({
            user: message.user,
            message: message.message,
          }))
        );
      })
      .catch((error) => {
        console.error("Erro ao buscar mensagens:", error);
      });
  }, []);

  const sendMessage = async (message: Message) => {
    if (!message) return;

    const lastMessage = message;
    try {
      setLoading(true);
      const response = await postMessage(lastMessage.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "bot", message: response },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const handleAddMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    sendMessage(message);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{ messages, loading, addMessage, clearMessages, handleAddMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
