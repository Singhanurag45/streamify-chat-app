import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        // Assuming you have a function to generate a token for the chat service
        const token = await generateStreamToken(req.user.id);
        
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error generating chat token:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}