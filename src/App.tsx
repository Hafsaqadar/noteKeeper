import { useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import NotebookPage from "./pages/NotebookPage";
import Sidebar from "./component/Sidebar";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";




export type Note = { id: string; title: string; content: string;
    notebookId: string;
 };
export type Notebook = {
 id: string; value: string; saved: boolean 
};

const App = () => {
// const [notebooks] = useState<Notebook[]>([]);
const [notebooks, setNotebooks] = useState<Notebook[]>([]);

useEffect(() => {
  const fetchNotebooks = async () => {
    const querySnapshot = await getDocs(collection(db, "notebooks"));
    const fetchedNotebooks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Notebook, "id">),
    }));
    setNotebooks(fetchedNotebooks);
  };

  fetchNotebooks();
}, []);






const [showNoteBox, setShowNoteBox] = useState(false); 
 
  const [notes, setNotes] = useState<Note[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className="flex min-h-screen">
      <Sidebar
        notebooks={notebooks}
        setNotebooks={setNotebooks}
        onNewNoteClick={() => setShowNoteBox(true)}
         sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
        />
        
      <main className="flex-1  p-4">
        <Routes>
          <Route
            path="/"
            element={
            <>
           <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m2 9H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-xl font-semibold">No notes yet. click + noteBooks  to add one!</p>
      </div>

            </>

            }
          />
          <Route
            path="/notebook/:id"
            element={
              <NotebookPage
                notebooks={notebooks}
                showNoteBox={showNoteBox}
                setShowNoteBox={setShowNoteBox} 
                notes={notes}
                setNotes={setNotes}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
