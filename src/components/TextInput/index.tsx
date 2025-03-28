"use client";

import { useChat } from "@/context";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";

export const TextInput = () => {
  const [message, setMessage] = React.useState("");
  const { handleAddMessage } = useChat();
  const handleSubmitForm = async () => {
    handleAddMessage({
      user: "user",
      message: message,
    });
    setMessage("");
  };

  return (
    <Box width="100%" display="flex">
      <Box padding="1rem" width="100%">
        <FormControl sx={{ width: "100%" }} variant="standard">
          <OutlinedInput
            sx={{ borderRadius: "3rem", paddingX: "0.5rem" }}
            id="standard-adornment-password"
            type="text"
            value={message}
            autoComplete="off"
            name="message"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMessage(event.target.value);
            }}
            placeholder="Digite sua mensagem"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmitForm();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleSubmitForm} type="submit">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Box>
  );
};
