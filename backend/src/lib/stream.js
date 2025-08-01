import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STEAMIFY_API_KEY;
const apiSecret = process.env.STEAMIFY_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}
 console.log("Streamify API KEY:", process.env.STEAMIFY_API_KEY);
 console.log("Streamify API SECRET:", process.env.STEAMIFY_API_SECRET);


const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
     console.log("Generated Stream token for:", userIdStr);
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
