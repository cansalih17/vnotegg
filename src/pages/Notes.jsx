import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import useAuth from "../custom-hooks/useAuth";
import { firestore } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const Notes = () => {
  const { currentUser } = useAuth();
  const [userNotes, setUserNotes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const [baseURL, setBaseURL] = useState("https://vnotess.netlify.app/");

  function truncateText(html, maxLength) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let plainText = tempDiv.textContent || "";

    if (plainText.length > maxLength) {
      plainText = plainText.substring(0, maxLength - 3);
    }

    return plainText;
  }

  useEffect(() => {
    const fetchUserNotes = async () => {
      if (currentUser && currentUser.email) {
        const notesQuery = query(
          collection(firestore, "notes"),
          where("email", "==", currentUser.email)
        );

        try {
          const querySnapshot = await getDocs(notesQuery);
          const notes = [];
          querySnapshot.forEach((doc) => {
            notes.push({ id: doc.id, ...doc.data() });
          });
          setUserNotes(notes);
        } catch (error) {
          console.error("Notları alma hatası:", error);
        }
      }
    };

    if (currentUser) {
      fetchUserNotes();
    }
  }, [currentUser]);

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteDoc(doc(firestore, "notes", selectedPostId));
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSelectedPostId(null);
      window.location.reload();
    } catch (error) {
      console.error("Silme hatası:", error);
      setIsDeleting(false);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(97, 91, 91, 0.75)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      border: "0px",
      padding: 0,
    },
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-4">Kullanıcı Notları</h1>
      <ul>
        {userNotes.map((note) => (
          <li key={note.id}>
            <div className="border border-gray-400 p-4 mb-4">
              <div className="flex justify-between items-center">
                <Link
                  to={baseURL + note.url}
                  rel="noopener noreferrer"
                  className="text-lg font-semibold"
                  target="_blank"
                >
                  {baseURL + note.url}
                </Link>
                <button
                  className="text-white hover:bg-red-700 border-2 px-4 py-1 rounded-xl bg-red-400"
                  variant="danger"
                  onClick={() => handleDeleteClick(note.id)}
                >
                  Sil
                </button>
              </div>

              <p className="mt-2 mb-2">
                <b>Not İçeriği :</b> {truncateText(note.content, 50)}
              </p>
              <details className="mt-2">
                <summary className="text-blue-500 hover:underline cursor-pointer border-2 rounded-lg px-4 py-2">
                  Notu Gör
                </summary>
                <p
                  className="text-gray-600 px-4 py-2"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                ></p>
              </details>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        style={customStyles}
      >
        <div className="w-96 p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Notu Sil</h2>
          <p>Notu silmek istediğinizden emin misiniz?</p>
          <div className="mt-4 flex justify-end">
            {isDeleting ? (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2 cursor-not-allowed"
                disabled
              >
                Siliniyor...
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                onClick={handleConfirmDelete}
              >
                Evet, Sil
              </button>
            )}
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setShowDeleteModal(false)}
            >
              İptal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Notes;
