import { useState } from "react";

type HeaderProps = {
  onAddBlock: (title: string, code: string) => void
}

export default function Header({ onAddBlock }: HeaderProps) {
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if( title && code) {
      onAddBlock(title, code);

      setTitle("");
      setTitle("");
    }
  }

  return (
    <div>
      <h1>Codeblocks App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Code Title</label>
        <input 
          name="title"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="code">Code Text</label>
        <input 
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text" 
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
