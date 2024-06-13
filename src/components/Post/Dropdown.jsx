import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import Modal from "../Modal";

const Dropdown = ({ tweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // düzenleme fonksiyonu
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  // silme fonksiyonu
  const handleDelete = () => {
    // döküman referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    // dökümanı koleksiyondan kaldır
    deleteDoc(tweetRef)
      .then(() => toast.info("Tweet akıştan kaldırıldı"))
      .catch(() => toast.error("Bir sorun oluştu"));
  };

  return (
    <>
      <label className="popup">
        <input type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Aksiyonlar</legend>
          <ul>
            <li>
              <button onClick={handleEdit}>
                <MdEdit />
                <span>Düzenle</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <FaTrashAlt />
                <span>Sil</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
      {isModalOpen && (
        <Modal tweet={tweet} close={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Dropdown;
