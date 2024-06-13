import { LuMessageCircle } from "react-icons/lu";
import { FaRetweet, FaRegHeart, FaHeart } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

const Buttons = ({ tweet }) => {
  // oturumu açık olan kullanıcı tweeti likeladı mı
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // like durumunu tersine çevirme
  const toggleLike = () => {
    // güncellencek dökümanın referansı alma
    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      likes: isLiked
        ? // eğer kullanıcı like'lamışsa likes dizisinden kullanıcının id'sini kaldırma
          arrayRemove(auth.currentUser.uid)
        : // yoksa likes dizisine  kullanıcının id'sini ekleme
          arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <LuMessageCircle className="hover:text-yellow-400 cursor-pointer text-lg" />
      </div>
      <div>
        <FaRetweet className="hover:text-blue-500 cursor-pointer text-lg" />
      </div>
      <div
        onClick={toggleLike}
        className=" flex items-center gap-2 hover:text-red-500 cursor-pointer text-lg"
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}

        {tweet.likes.length}
      </div>
      <div>
        <CiShare2 className="hover:text-blue-500 cursor-pointer text-lg" />
      </div>
    </div>
  );
};

export default Buttons;
