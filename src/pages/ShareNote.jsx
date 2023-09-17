import React, { useState } from "react";
import { nanoid } from "nanoid";
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import ClipboardJS from "clipboard";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ShareNote = () => {
  const [note, setNote] = useState("");
  const [generatedURL, setGeneratedURL] = useState("");
  const [isLoading, setLoading] = useState(false);

  const copyToClipboard = (text) => {
    const clipboard = new ClipboardJS(".copy-button", {
      text: () => "localhost:3000/" + text,
    });
  };

  const handleShare = async () => {
    setLoading(true);
    const url = nanoid(5);

    try {
      const docRef = await addDoc(collection(firestore, "notes"), {
        content: note,
        url: url,
      });
      await navigator.clipboard.writeText("localhost:3000/" + url);
      setGeneratedURL(url);
      copyToClipboard(url);
      setLoading(false);
    } catch (error) {
      console.error("Firestore kaydetme hatası:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleShare}
            className={` text-white rounded px-4 py-2  ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Paylaşılıyor" : "Paylaş"}
          </button>
          <div className="flex items-center">
            {generatedURL && (
              <>
                <div className="mr-4">
                  <span className="ml-2 cursor-pointer">
                    {"localhost:3000/" + generatedURL}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedURL)}
                  className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 ml-auto copy-button"
                >
                  Kopyala
                </button>
              </>
            )}
          </div>
        </div>

        <ReactQuill
          theme="snow"
          value={note}
          onChange={setNote}
          style={{ height: "500px" }}
        />
      </div>
    </div>
  );
};

export default ShareNote;
