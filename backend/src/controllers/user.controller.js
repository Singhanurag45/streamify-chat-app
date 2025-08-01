import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";


export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, // exclude current user's friends
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
    try{
        const user = await User.findById(req.user.id)
        .select('friends')
        .populate("friends" , " fullName profilePic nativeLanguage learningLanguage location");
    
        res.status(200).json(user.friends);
    }catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendFriendRequest(req, res) {
   
    try{
        const myId = req.user.id;
        const {id:recipientId} =  req.params
        
        // prevent sending request to self
        if(myId === recipientId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }
         
        const recipient = await User.findById(recipientId);
        if(!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }
        // Check if the recipient is already a friend
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }
        // Check if a friend request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });
        if(existingRequest) {
            return res
              .status(400)
              .json({ message: "Friend request already exists" });
        }
        
        // Create a new friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });
        console.log("Friend request created:", friendRequest);

        res.status(201).json({
            message: "Friend request sent successfully",
            friendRequest,
        }); 

    }catch(error){
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
  
}

export async function acceptFriendRequest(req, res) {
    try{
        const {id:requestId} = req.params;
        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        // verify the current user is the recipient of the request
        if(friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

         // add each user to each other's friends list{array}
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({ message: "Friend request accepted successfully" });

    }catch(error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getMyFriendRequests(req, res) {
  try {
    console.log("🔐 [getMyFriendRequests] req.user.id =", req.user?.id);

    const incomingRequests = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate({
      path: "sender",
      select: "fullName profilePic nativeLanguage learningLanguage",
    });

    const acceptedRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate({
      path: "recipient",
      select: "fullName profilePic",
    });

    console.log("📥 Incoming:", incomingRequests.length);
    console.log("✅ Accepted:", acceptedRequests.length);

    res.status(200).json({
      incomingRequests,
      acceptedRequests,
    });
  } catch (error) {
    console.error("❌ Error fetching friend requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
