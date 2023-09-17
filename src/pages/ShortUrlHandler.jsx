import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";

const ShortUrlHandler = () => {
  const { shortUrl } = useParams();
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState(null);
  const contentEditableRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const q = query(
          collection(firestore, "notes"),
          where("url", "==", shortUrl)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setNoteContent(data.content);
          
          contentEditableRef.current.focus();
        } else {
          setError("Not bulunamadı veya geçersiz URL");
        }
      } catch (error) {
        console.error("Firestore hatası:", error);
        setError("Not alınırken bir hata oluştu");
      }
    };

    fetchNote();
  }, [shortUrl]);

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full">
        <h2 className="text-2xl font-semibold mb-4">Kısa URL Notu</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div
            contentEditable="true"
            ref={contentEditableRef}
            className="p-10 bg-white rounded-lg font-semibold border-2 focus:border-blue-400 focus:outline-none"
            dangerouslySetInnerHTML={{ __html: noteContent }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ShortUrlHandler;
