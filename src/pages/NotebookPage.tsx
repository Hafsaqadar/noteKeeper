import { useParams } from "react-router-dom";

type Notebook = { id: string; value: string; saved: boolean };

type Props = {
  notebooks: Notebook[];
};

const NotebookPage = ({ notebooks }: Props) => {
  const { id } = useParams();
  const notebook = notebooks.find(n => n.id === id);

  if (!notebook) {
    return <p className="text-red-500">Notebook not found 😢</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📝 {notebook.value}
      </h2>
      {/* You can later add more content here like note content */}
    </div>
  );
};

export default NotebookPage;
