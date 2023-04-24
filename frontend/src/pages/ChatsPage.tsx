// import { useQuery } from "@tanstack/react-query";
// import { Chat } from "../models/Chat";
// import axios from "axios";

import { useChatState } from "../context/ChatProvider.tsx";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/mixed/SideDrawer.tsx";
import MyChats from "../components/MyChats.tsx";
import ChatBox from "../components/ChatBox.tsx";
import { useState } from "react";

const ChatsPage = () => {
  const { user } = useChatState();
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};
export default ChatsPage;
