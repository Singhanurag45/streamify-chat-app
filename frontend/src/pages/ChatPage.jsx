import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // run only if user exists
  });


 useEffect(() => {
   let client;

   const initChat = async () => {
     if (!tokenData?.token || !authUser) {
       console.error("Stream token or authUser missing");
       setLoading(false);
       return;
     }
    console.log("authUser._id:", authUser?._id);
    console.log("Stream token:", tokenData?.token);

     try {
       client = StreamChat.getInstance(STREAM_API_KEY);

       if (client.userID) {
         await client.disconnectUser();
       }

       await client.connectUser(
         {
           id: authUser.id || authUser._id,
           name: authUser.fullName,
           image: authUser.profilePic,
         },
         tokenData.token
       );

       if (authUser._id === targetUserId) {
         toast.error("You cannot chat with yourself.");
         setLoading(false);
         return;
       }

       const channelId = [authUser._id, targetUserId].sort().join("-");
       const currChannel = client.channel("messaging", channelId, {
         members: [authUser._id, targetUserId],
       });

       await currChannel.watch();

       setChatClient(client);
       setChannel(currChannel);
     } catch (error) {
       console.error("Error initializing chat:", error);
       toast.error("Failed to connect to chat.");
     } finally {
       setLoading(false);
     }
   };

   initChat();

   return () => {
     if (client) {
       client.disconnectUser().catch(console.error);
     }
   };
 }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
