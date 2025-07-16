import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Note, Notebook } from "../App";
import NoteBox from "../component/NoteBox";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {db} from "../../firebase/config";


import { doc, deleteDoc, updateDoc, collection, getDocs, 
  query, where, addDoc,
 } from "firebase/firestore";

type Props = {
  notebooks: Notebook[];
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  showNoteBox: boolean;
  setShowNoteBox: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotebookPage = ({
  notebooks,
  notes,
  setNotes,
  showNoteBox,
  setShowNoteBox,
}: Props) => {
  const { id } = useParams();
  const notebook = notebooks.find((n) => n.id === id);

  const [editMode, setEditMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // fetch notes from firestore
  useEffect(() => {
    const fetchNotes = async () => {
      if(!notebook) return;
      const q = query(
      collection(db, "notes"),
      where("notebookId", "==", notebook.id)
      );
      const querySnapshot = await getDocs(q);
      const fetchedNotes: Note[] = querySnapshot.docs.map((doc) => ({
        id:doc.id,
        ...(doc.data() as Omit<Note, "id">),
      }));
      setNotes(fetchedNotes);
    };
    fetchNotes();
  },[notebook, setNotes]);

  if (!notebook) {
    return ;
  }

const handleSaveNote = async (title: string, content: string) => {
  const noteData = {
    title,
    content,
    notebookId: notebook.id,
  };

  const docRef = await addDoc(collection(db, "notes"), noteData);

  const newNote: Note = {
    id: docRef.id,
    ...noteData,
  };

  setNotes((prev) => [...prev, newNote]);
  setShowNoteBox(false);
};


  const handleOpenReadModal = (note: Note) => {
    setSelectedNote(note);
    setEditMode(false);
  };

  const handleOpenEditModal = (note: Note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditMode(true);
  };

  const handleUpdateNote = async () => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? { ...note, title: editTitle, content: editContent }
          : note
      );

       await updateDoc(doc(db, "notes", selectedNote.id), {
        title: editTitle,
        content: editContent,
      });

      setNotes(updatedNotes);
      setSelectedNote(null);
    }
  };

  const handleDeleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
    setNotes(notes.filter((note) => note.id !== id));
  };

  const notebookNotes = notes.filter((note) => note.notebookId === notebook.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">{notebook.value}</h1>

      {showNoteBox && (
        <NoteBox
          onSave={handleSaveNote}
          onClose={() => setShowNoteBox(false)}
        />
      )}

      {/* Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-gray-600 text-xl hover:text-red-500"
              onClick={() => setSelectedNote(null)}
            >
              &times;
            </button>

            {editMode ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mb-4 outline-none p-2 "
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={8}
                  className="w-full p-2  resize-none focus:outline-none "
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleUpdateNote}
                    className="px-4 py-1 bg-orange-300 text-gray-900 font-semibold rounded hover:bg-orange-600"
                  >
                    Save 
                  </button>
                </div>
              </>
            ) : (
              <div className="max-h-[70vh] overflow-y-auto pr-1">
                <h2 className="text-xl font-bold mb-2">{selectedNote.title}</h2>
                <p className="whitespace-pre-wrap">{selectedNote.content}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="mt-6">
        {notebookNotes.length === 0 && !showNoteBox ? (
          <p className="text-gray-500">No notes yet. Click 'New Note' to start!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notebookNotes.map((note) => (
              <div
                key={note.id}
                className="relative bg-orange-100 p-4 rounded-xl shadow group cursor-pointer transition flex flex-col justify-between min-h-[12rem] hover:border-2 hover:border-gray-500 hover:rounded-2xl border-2 border-orange-500 "
              >
                {/* Top content */}
                <div
                  onClick={() => handleOpenReadModal(note)}
                  className="flex-1"
                >
                  <h2 className="font-semibold text-lg mb-2">{note.title}</h2>
                  <p className="overflow-hidden text-ellipsis line-clamp-4">
                    {note.content}
                  </p>
                </div>

                {/* Hover Buttons at Bottom */}
                <div className="mt-2 hidden group-hover:flex justify-end space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModal(note);
                    }}
                    className="text-2xl text-gray-800 mr-2"
                  >
                <MdOutlineEdit/>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    className=" text-2xl text-gray-800 "
                  >
                   <RiDeleteBin6Line/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotebookPage;
