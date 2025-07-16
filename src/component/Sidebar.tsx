import { HiPlusSm } from "react-icons/hi";
import NewNotebookForm from "./NewNotebookForm";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

type Notebook = {
  id: string;
  value: string;
  saved: boolean;
};

type Props = {
  notebooks: Notebook[];
  setNotebooks: React.Dispatch<React.SetStateAction<Notebook[]>>;
  onNewNoteClick: () => void; // This will trigger showNoteBox in App
   sidebarOpen: boolean;
   setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const Sidebar = ({ notebooks, setNotebooks, onNewNoteClick, sidebarOpen, setSidebarOpen  }: Props) => {
  return (
    <>

  {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className=" md:hidden fixed top-4 right-4 z-50 "
      >
        {sidebarOpen ? <IoClose size={24} /> : <RxHamburgerMenu size={24} />}
      </button>



    {/* <div className="w-60 lg:block md:block hidden bg-orange-100 text-white p-4 min-h-screen "> */}
       <div
  className={`
    fixed top-0 z-40 w-60 bg-orange-100 text-white p-4 min-h-screen transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "translate-x-full"} 
    right-0 
    md:translate-x-0 md:static md:left-0 md:block md:right-auto
  `}
>
     
      <h1 className="font-bold text-gray-600 text-xl">keepNotes</h1>


      <button
        onClick={onNewNoteClick}
        className="mt-5 px-3 py-2 bg-orange-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 flex items-center gap-1"
      >
        <HiPlusSm size={20} className="mt-1" /> new note
      </button>

      <NewNotebookForm notebooks={notebooks} setNotebooks={setNotebooks} />
    </div>
    </>
  );
};

export default Sidebar;
