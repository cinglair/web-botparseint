"use client";

import {
  MessageLeft,
  MessageLoadingLeft,
  MessageRight,
} from "@/components/Message";
import { TextInput } from "@/components/TextInput";
import { useChat } from "@/context";
import GradingIcon from "@mui/icons-material/Grading";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Divider, Paper, Tab, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import OrderList from "../OrderList";
const PaperWrapper = styled(Paper)({
  width: "100%",
  height: "100%",
  maxWidth: "500px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const PaperMessages = styled(Paper)({
  width: "100%",
  overflowY: "auto",
  height: "100%",
});

const Container = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  background: "#f1f4f4",
  alignItems: "center",
  justifyContent: "center",
});

const ContainerChat = () => {
  const { messages, loading } = useChat();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("1");

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages, loading]);

  const handleChange = (__: React.SyntheticEvent, newValue: string) => {
    console.log(newValue, typeof newValue);
    setValue(newValue);
  };
  return (
    <Container>
      <PaperWrapper elevation={2}>
        <TabContext value={value}>
          <Box width="100%">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={{ width: "50%" }}
                icon={<SmartToyIcon />}
                iconPosition="start"
                label="Chatbot"
                value="1"
              />
              <Tab
                sx={{ width: "50%" }}
                icon={<GradingIcon />}
                iconPosition="start"
                label="Histórico"
                value="2"
              />
            </TabList>
          </Box>
        </TabContext>

        {value === "2" && (
          <Box width="100%" height="100%">
            <OrderList />
          </Box>
        )}
        {value === "1" && (
          <>
            <Box display="flex" alignItems="center" gap="0.5rem" padding="1rem">
              <Box
                sx={{ background: "#A8DDFD" }}
                width="2.5rem"
                height="2.5rem"
                display="flex"
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
              >
                <SmartToyIcon sx={{ color: "gray.500" }} />
              </Box>
              <Typography variant="h6" fontWeight="bold">
                Chatbot para pedidos
              </Typography>
            </Box>
            <Box width="100%">
              <Divider />
            </Box>
            <PaperMessages elevation={0} id="style-1">
              <Box display="flex" flexDirection="column" padding="1rem">
                {messages.map((item, index) => {
                  return item.user === "user" ? (
                    <MessageRight key={index} message={item.message} />
                  ) : (
                    <MessageLeft key={index} message={item.message} />
                  );
                })}
                {loading && <MessageLoadingLeft />}
                <div ref={endOfMessagesRef} />

                {!messages.length && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    paddingY="1rem"
                    minHeight="60vh"
                  >
                    <Box
                      width="80%"
                      display="flex"
                      height="100%"
                      justifyContent="center"
                      gap="0.5rem"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <Box
                        sx={{ background: "#A8DDFD" }}
                        width="6rem"
                        height="6rem"
                        display="flex"
                        borderRadius="50%"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <SmartToyIcon
                          sx={{
                            width: "4rem",
                            height: "4rem",
                            color: "gray.500",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        align="center"
                        fontSize="1.2rem"
                        fontWeight="caption"
                      >
                        Olá, eu sou o assistente virtual da loja. Como posso
                        ajudar?
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </PaperMessages>
            <TextInput />
          </>
        )}
      </PaperWrapper>
    </Container>
  );
};

export default ContainerChat;
