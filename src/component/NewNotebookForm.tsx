import { HiPlusSm } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
 import { Link } from "react-router-dom";
 import { v4 as uuidv4 } from "uuid";


type Notebook = { id: string; value: string; saved: boolean };

type Props = {
  notebooks: Notebook[];
  setNotebooks: React.Dispatch<React.SetStateAction<Notebook[]>>;
};

const NewNotebookForm = ({ notebooks, setNotebooks }: Props) => {
//   const [notebooks, setNotebooks] = useState<Notebook[]>([]);


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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Enter" && notebooks[idx].value.trim() !== "") {
      setNotebooks(notebooks.map((n, i) => i === idx ? { ...n, saved: true } : n));
    }
  };

//   handleDelete

    const handleDelete = (idx: number) => {
        setNotebooks(notebooks.filter((_, i) => i !== idx));
    };

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
    <div className="bg-red-400 rounded-full px-3 py-2 text-gray-900 w-full flex justify-between hover:bg-red-300 transition">
      <span>{notebook.value}</span>
      <span className="flex gap-4 mt-1 cursor-pointer">
        <MdOutlineEdit onClick={(e) => { e.preventDefault(); handleEdit(idx); }} />
        <RiDeleteBin6Line onClick={(e) => { e.preventDefault(); handleDelete(idx); }} />
      </span>
    </div>
  </Link>

//         {notebooks.map((notebook, idx) => (
//           <li key={idx} className="w-full ">
//             {notebook.saved ? (
//               <div className="bg-red-400 rounded-full px-3 py-2 text-gray-900 w-full flex justify-between">{notebook.value}
//                <Link to={`/notebook/${notebook.id}`} className="hover:underline">
//                  {notebook.value}
//                </Link> 
//                <span className="flex gap-4 mt-1 cursor-pointer">
//                 <MdOutlineEdit onClick={() => handleEdit(idx)} /> 
//                 <RiDeleteBin6Line 
//                 onClick={() => handleDelete(idx)}/></span>
//  </div>
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


