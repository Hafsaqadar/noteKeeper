import { useState } from "react";

type NoteBoxProps = {
  onSave: (title: string, content: string) => void;
  onClose: () => void;
};

const NoteBox = ({ onSave, onClose }: NoteBoxProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Box */}
      <div className="bg-yellow-100 p-6 w-11/12 max-w-md rounded-xl shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <input
          type="text"
          placeholder="Untitled"
         className="bg-transparent outline-none w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Take a note..."
           className="bg-transparent outline-none w-full mt-5"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="mt-4 w-full flex justify-end">
          <button
            className="px-5 py-1  text-gray-700 font-semibold rounded-md hover:bg-yellow-200"
            onClick={() => onSave(title, content)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteBox;
