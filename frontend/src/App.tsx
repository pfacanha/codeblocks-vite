import { useEffect, useState } from 'react';
import './App.css';
import Blocks from './components/Blocks';
import Header from './components/Header';
import type { TBlock } from './types'
import { getCodeBlocks, createCodeBlocks, deleteCodeBlock, editCodeBlock } from './helpers/fetchers'
import Edit from './components/Edit';
import { Route, Routes } from 'react-router';

function App() {
  // the source of truth
  const [blocks, setBlocks] = useState<TBlock[]>([]);

  const handleAddBlock = async (title: string, code: string) => {
    const newBlock = await createCodeBlocks(title, code)

    setBlocks([...blocks, newBlock]);
  }

  const handleDeleteBlock = async (id: string) => {
    await deleteCodeBlock(id);
    const updatedList = (blocks.filter(block => block.id !== id));
    setBlocks(updatedList);
  };

  const handleEditBlock = async (id: string, title: string, code: string) => {
    const editedBlock = await editCodeBlock(id, title, code);

    setBlocks((prev) => (prev.map(block => block.id === id ? editedBlock : block)));
  }

  useEffect(() => {
    const fetchBlocks = async () => {
      const codeblocks = await getCodeBlocks();
      setBlocks(codeblocks);
    };

    fetchBlocks();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onAddBlock={handleAddBlock} />
              <Blocks blocks={blocks} onDelete={handleDeleteBlock} />
            </>
          }
        />
        <Route
          path="/:id/edit"
          element={<Edit onEditBlock={handleEditBlock} blocks={blocks}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
