import { HiPlusSm } from "react-icons/hi";


const Sidebar = () => {
  return (
    <div className="w-60 h-full bg-orange-100 text-white p-4">
   
     <h1 className="font-bold text-gray-600 text-xl">keepNotes</h1>
     <button className="mt-5 px-3 py-2 bg-orange-200 text-gray-600 font-semibold rounded-lg  hover:bg-gray-200 flex items-center gap-1">
      <HiPlusSm size={20} className="mt-1"  />  new note
        </button>

     <h2 className="mt-2 text-gray-600 font-semibold flex items-center gap-20">NoteBooks
        <HiPlusSm size={20} className="mt-1"   /> 
     </h2>
     
 
   

  
    </div>
  )
}

export default Sidebar