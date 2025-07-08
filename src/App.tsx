import Sidebar from "./component/Sidebar"
// import NewNotebookForm from "./component/NewNotebookForm"
import NotebookPage from "./pages/NotebookPage"
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

type Notebook = { value: string; saved: boolean };

const App = () => {
   const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  
  return (
    <div className="flex h-screen">
      <Sidebar  notebooks={notebooks} setNotebooks={setNotebooks}/>
      <main className="flex-1 bg-gray-100 p-4">
         <Routes>
          <Route
          path="/"
          element={
            <>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Good morning </h1>
        
         <ul className="mb-6">
        {notebooks
          .filter(n => n.saved)
          .map((n, idx) => (
            <li key={idx} className="text-lg text-gray-700">
              {n.value}
            </li>
          ))}
      </ul>
      </>
          } /> 

          <Route
          path="/notebook/:id"
           element={<NotebookPage notebooks={notebooks} />}
              />
        </Routes>


        {/* <NewNotebookForm notebooks={notebooks} setNotebooks={setNotebooks} /> */}
        </main>
        
      </div>
  )
}

export default App