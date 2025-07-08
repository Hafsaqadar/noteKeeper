import { HiPlusSm } from "react-icons/hi";
 import NewNotebookForm from "./NewNotebookForm";



 type Notebook = {id: string;  value: string; saved: boolean };

type Props = {
  notebooks: Notebook[];
  setNotebooks: React.Dispatch<React.SetStateAction<Notebook[]>>;
};


const Sidebar = ({ notebooks, setNotebooks }: Props) => {


  return (
    <div className="w-60 h-full bg-orange-100 text-white p-4">
   
     <h1 className="font-bold text-gray-600 text-xl">keepNotes</h1>
     <button className="mt-5 px-3 py-2 bg-orange-200 text-gray-600 font-semibold rounded-lg  hover:bg-gray-200 flex items-center gap-1">
      <HiPlusSm size={20} className="mt-1"  />  new note
        </button>
        <NewNotebookForm  notebooks={notebooks} setNotebooks={setNotebooks}  />

    
     

  
    </div>
  )
}

export default Sidebar