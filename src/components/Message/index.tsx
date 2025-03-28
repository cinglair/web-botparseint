"use client";

import { Box, styled } from "@mui/system";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import MarkdownPreview from "@uiw/react-markdown-preview";

// Estilos utilizando styled
const MessageRow = styled("div")({
  display: "flex",
});

const MessageRowRight = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const MessageBlue = styled("div")({
  marginLeft: "0.5rem",
  marginBottom: "10px",
  maxWidth: "80%",
  padding: "10px",
  backgroundColor: "#A8DDFD",
  width: "auto",
  textAlign: "left",
  borderRadius: "10px",
});

const MessageOrange = styled("div")({
  marginRight: "20px",
  marginBottom: "10px",
  padding: "10px",
  maxWidth: "80%",
  backgroundColor: "#f8e896",
  width: "auto",
  textAlign: "left",
  borderRadius: "10px",
});

const MessageContent = styled("div")({
  padding: 0,
  margin: 0,
});

export const MessageLeft = (props: {
  message?: string;
  displayName?: string;
}) => {
  const { message = "Sem mensagem" } = props;
  return (
    <MessageRow>
      <Box
        sx={{ background: "#A8DDFD" }}
        minWidth="2.5rem"
        minHeight="2.5rem"
        maxHeight="2.5rem"
        display="flex"
        borderRadius="50%"
        justifyContent="center"
        alignItems="center"
      >
        <SmartToyIcon sx={{ color: "gray.500" }} />
      </Box>
      <div>
        <MessageBlue>
          <MessageContent>
            {!!message && (
              <MarkdownPreview
                style={{
                  padding: 8,
                  background: "transparent",
                  color: "black",
                }}
                source={message}
              />
            )}
          </MessageContent>
        </MessageBlue>
      </div>
    </MessageRow>
  );
};

export const MessageLoadingLeft = () => {
  return (
    <MessageRow>
      <Box
        sx={{ background: "#A8DDFD" }}
        minWidth="2.5rem"
        minHeight="2.5rem"
        maxHeight="2.5rem"
        display="flex"
        borderRadius="50%"
        justifyContent="center"
        alignItems="center"
      >
        <SmartToyIcon sx={{ color: "gray.500" }} />
      </Box>
      <div>
        <MessageBlue>
          <MessageContent>
            <Box
              sx={{
                width: "1.5rem",
                aspectRatio: 1,
                "--_g":
                  "no-repeat radial-gradient(circle closest-side, #000 90%, #0000)",
                background:
                  "var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%",
                backgroundSize: "calc(100%/4) 50%",
                animation: "l3 1s infinite linear",
                "@keyframes l3": {
                  "20%": { backgroundPosition: "0% 0%, 50% 50%, 100% 50%" },
                  "40%": { backgroundPosition: "0% 100%, 50% 0%, 100% 50%" },
                  "60%": { backgroundPosition: "0% 50%, 50% 100%, 100% 0%" },
                  "80%": { backgroundPosition: "0% 50%, 50% 50%, 100% 100%" },
                },
              }}
            />
          </MessageContent>
        </MessageBlue>
      </div>
    </MessageRow>
  );
};

export const MessageRight = (props: {
  message?: string;
  displayName?: string;
}) => {
  const { message = "no message" } = props;
  return (
    <MessageRowRight>
      <MessageOrange>
        {!!message && (
          <MarkdownPreview
            source={message}
            style={{ padding: 8, background: "transparent", color: "black" }}
          />
        )}
      </MessageOrange>
    </MessageRowRight>
  );
};
