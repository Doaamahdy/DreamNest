import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

// Create Context
// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const {curentUser} = useContext(AuthContext);
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    console.log(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  const context = {
    socket,
  };

  useEffect(() => {
    curentUser && socket?.emit("newUser", curentUser.id);
  }, [socket, curentUser]);

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
