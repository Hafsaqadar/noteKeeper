import { HiPlusSm } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
 import { Link, useNavigate } from "react-router-dom";
 import { v4 as uuidv4 } from "uuid";


 import {db} from "../../firebase/config";

 import { doc, deleteDoc,  collection,  addDoc,
 } from "firebase/firestore";


type Notebook = { id: string; value: string; saved: boolean };

type Props = {
  notebooks: Notebook[];
  setNotebooks: React.Dispatch<React.SetStateAction<Notebook[]>>;
};

const NewNotebookForm = ({ notebooks, setNotebooks }: Props) => {
//   const [notebooks, setNotebooks] = useState<Notebook[]>([]);
const navigate = useNavigate();

  // Add a new input field
  const handleAddInput = () => {
    setNotebooks([...notebooks, {
      
        id: uuidv4(),
        //  id: Date.now().toString(),
         value: "", saved: false }]);
  };

  // Handle input change for a specific input
  const handleInputChange = (idx: number, val: string) => {
    setNotebooks(notebooks.map((n, i) => i === idx ? { ...n, value: val } : n));
  };

  // Save notebook on Enter
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
  //   if (e.key === "Enter" && notebooks[idx].value.trim() !== "") {
  //     setNotebooks(notebooks.map((n, i) => i === idx ? { ...n, saved: true } : n));
  //   }
  // };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Enter" && notebooks[idx].value.trim() !== "") {
      try{
        const docRef = await addDoc(collection(db, "notebooks"), {
          value: notebooks[idx].value,
          saved: true,
      })
      const updatedNotebooks = notebooks.map((n, i) =>
        i === idx ? { ...n, saved: true,  id: docRef.id  } : n
      );
      setNotebooks(updatedNotebooks);

      // Redirect only if this is the first notebook saved
      // i.e. when length === 1 and this is the one saved
      if (updatedNotebooks.length === 1 && updatedNotebooks[idx].saved) {
        navigate(`/notebook/${updatedNotebooks[idx].id}`);
      }
    }
    catch (error) {
      console.error("Error saving notebook:", error);
    }
  }
  };



//   handleDelete

    // const handleDelete = (idx: number) => {
    //     setNotebooks(notebooks.filter((_, i) => i !== idx));
    // };
const handleDelete = async (idx: number) => {
  const deletedNotebook = notebooks[idx];

   if (deletedNotebook.saved) {
    try {
      await deleteDoc(doc(db, "notebooks", deletedNotebook.id));
    } catch (error) {
      console.error("Error deleting notebook from Firestore:", error);
    }
  }

  
  // Remove the notebook
  const updatedNotebooks = notebooks.filter((_, i) => i !== idx);
  setNotebooks(updatedNotebooks);


  
  // Redirect logic
  const firstSaved = updatedNotebooks.find((n) => n.saved);
  if (firstSaved) {
    navigate(`/notebook/${firstSaved.id}`);
  } else {
    navigate(`/`);
  }
};


// If the deleted notebook was the first saved notebook
  // Find the first saved notebook in updated list
//   if (deletedNotebook.saved) {
//     // Get saved notebooks sorted by position (or index)
//     const firstSaved = updatedNotebooks.find((n) => n.saved);

//     if (firstSaved) {
//       // Redirect to the next saved notebook page
//       navigate(`/notebook/${firstSaved.id}`);
//     } else {
//       // No notebooks left, redirect to home or wherever
//       navigate(`/`);
//     }
//   }
// };


    // Handle edit mode
    const handleEdit = (idx: number) => {
        setNotebooks(notebooks.map((n, i) => i === idx ? { ...n, saved: false } : n));
    }

  return (
    <div>
      <h2 className="mt-2 text-gray-600 font-semibold flex items-center gap-20">
        NoteBooks
        <button className="mt-1" onClick={handleAddInput}>
          <HiPlusSm size={20} />
        </button>
      </h2>
      <ul className="mt-5 w-full flex flex-col gap-4 ">
       {notebooks.map((notebook, idx) => (
          <li key={idx} className="w-full ">
        {notebook.saved ? (
  <Link to={`/notebook/${notebook.id}`}>
    <div className="bg-red-400 rounded-full py-1 pl-1 p-2 text-gray-900 w-full flex justify-between hover:bg-red-300 transition">
      <span className="px-2">{notebook.value}</span>
      <span className="flex gap-2 mt-1 cursor-pointer">
        <MdOutlineEdit onClick={(e) => { e.preventDefault(); handleEdit(idx); }} />
        <RiDeleteBin6Line onClick={(e) => { e.preventDefault(); handleDelete(idx); }} />
      </span>
    </div>
  </Link>
            ) : (
              <input
                type="text"
                className="px-4 py-1 rounded-full text-black w-full"
                placeholder="add new notes"
                value={notebook.value}
                onChange={e => handleInputChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(e, idx)}
                autoFocus
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewNotebookForm;


