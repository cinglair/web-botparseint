"use client";

import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import GradingIcon from "@mui/icons-material/Grading";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useChat } from "@/context";

const OrderList = () => {
  const { ordersList } = useChat();
  return (
    <Box height="80%" width="100%">
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
          <GradingIcon sx={{ color: "gray.500" }} />
        </Box>
        <Typography variant="h6" fontWeight="bold">
          Histórico de pedidos
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" width="100%" maxHeight="100%">
        <Box height="100%" sx={{ overflowY: "auto" }}>
          {ordersList.map((item, index) => (
            <Box sx={{ padding: "1rem" }} key={index}>
              <Paper elevation={3}>
                <MarkdownPreview
                  source={item}
                  style={{
                    padding: 8,
                    width: "100%",
                    background: "transparent",
                    color: "black",
                  }}
                />
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderList;
