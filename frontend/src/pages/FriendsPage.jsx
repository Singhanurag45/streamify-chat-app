// src/pages/FriendsPage.jsx
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api.js";
import FriendCard from "../components/FriendCard.jsx";
import Loader from "../components/Loader.jsx";

const FriendsPage = () => {
  const {
    data: friends,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
   console.log("Friends Data:", friends);
   
  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load friends.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Friends</h1>
      {friends.length === 0 ? (
        <p className="text-gray-500">No friends yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
