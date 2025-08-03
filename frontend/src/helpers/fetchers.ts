export async function getCodeBlocks(){
  const response = await fetch("http://localhost:3000/blocks");

  if(!response){
    throw new Error("Something went wrong fetching codeblocks");
  }

  const result = await response.json();
  
  return result;
}

export async function createCodeBlocks(title: string, code: string){
  const response = await fetch("http://localhost:3000/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, code })
    }
  );

  if(!response){
    throw new Error("Something went wrong creating codeblocks");
  }

  const result = await response.json();
  
  return result;
}

export async function deleteCodeBlock(id: string){
  const response = await fetch(`http://localhost:3000/${id}/delete`, {
    method: "DELETE",
  })

  if (!response.ok) {
      throw new Error("Failed to delete block");
  }

  return true;
}

export async function editCodeBlock(id: string, title: string, code: string){
  const response = await fetch(`http://localhost:3000/${id}/edit`,
    {
      method: "PUT",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({ title, code })
    }
  )

  const updatedBlock = await response.json();

  return updatedBlock 
}