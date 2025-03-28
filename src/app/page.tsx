"use client";

import ContainerChat from "@/components/ContainerChat";
import { ChatProvider } from "@/context";
import { useEffect, useState } from "react";

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <ChatProvider>
      <ContainerChat />
    </ChatProvider>
  );
}
