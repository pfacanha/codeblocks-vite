import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TBlock } from "../types";

type EditBlockProps = {
  blocks: TBlock[]
  onEditBlock: (id: string, title: string, code: string) => void
}
export default function Edit({ onEditBlock }: EditBlockProps) {
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedCode, setEditedCode] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const navigate = useNavigate();
    const { id } = useParams();

    e.preventDefault();

    if(id && editedTitle && editedCode) {
      onEditBlock(id, editedTitle, editedCode);
    }

    setEditedTitle("");
    setEditedCode("");

    navigate("/");
  }

  return (
    <div>
      <h1>Edit your codeblocks</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Code Title</label>
        <input 
          name="title"
          type="text"
          value={editedTitle}
          onChange={(e) => e.target.value}
        />
        <label htmlFor="code">Code Text</label>
        <input 
          name="code"
          type="text"
          value={editedCode}
          onChange={(e) => e.target.value}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}