import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMessages } from "../../service/getMessages";
import { postMessage } from "../../service/postMessage";
import { getNewUser } from "../../service/getNewUser";
import { getOrdersList } from "../../service/getOrdersList";

interface Message {
  user: string;
  message: string;
}

interface ChatContextType {
  loading: boolean;
  messages: Message[];
  ordersList: string[];
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
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );

  const [ordersList, setOrdersList] = useState<string[]>([]);

  async function getUserId() {
    if (!userId) {
      try {
        const response = await getNewUser();
        const { id } = response;
        localStorage.setItem("userId", String(id));
        setUserId(String(id));
      } catch (error) {
        console.error("Erro ao obter novo usuário:", error);
      }
    } else setUserId(userId);
  }

  async function getOrderList() {
    if (userId) {
      try {
        const data = await getOrdersList({ userId: String(userId!) });
        const { response } = data;
        setOrdersList(response);
      } catch (error) {
        console.error("Erro ao obter novo usuário:", error);
      }
    }
  }

  useEffect(() => {
    getOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, userId]);

  useEffect(() => {
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userId) return;
    getMessages({
      idUser: Number(userId),
      idRestaurant: 1,
      limit: 10,
      offset: 0,
    })
      .then((response) => {
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
  }, [userId]);

  const sendMessage = async (message: Message) => {
    if (!message) return;

    const lastMessage = message;
    try {
      setLoading(true);
      const response = await postMessage({
        message: lastMessage.message,
        idUser: userId!,
      });
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
      value={{
        messages,
        loading,
        ordersList,
        addMessage,
        clearMessages,
        handleAddMessage,
      }}
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
