import { useNavigate } from "react-router";
import type { TBlock } from "../types";

type BlocksProps = {
  blocks: TBlock[];
  onDelete: (id: string) => void;
};

export default function Blocks({ blocks, onDelete }: BlocksProps) {
  const navigate = useNavigate();

  const pageRedirect = (id: string) => {
    navigate(`/${id}/edit`);
  };

  return (
    <>
      {blocks.map((block) => (
        <ul key={block?.id}>
          <li style={{ listStyleType: "none" }}>{block?.title}</li>
          <li style={{ listStyleType: "none" }}>{block?.code}</li>
          <button onClick={() => onDelete(block?.id)} type="button">
            Delete
          </button>
          <button onClick={() => pageRedirect(block?.id)} type="button">
            Edit
          </button>
        </ul>
      ))}
    </>
  );
}
