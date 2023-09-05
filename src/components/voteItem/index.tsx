import "./style.css";

interface VoteProps {
  id: number;
  voteCount: number;
  updateVote: (id: number, vote: number) => void;
}

export function Vote({ id, voteCount, updateVote }: VoteProps) {
  const handleVoteCount = () => {
    updateVote(id, voteCount + 1);
  };

  return (
    <div className={"vote-item"}>
      <img
        role="vote-btn"
        data-testid={`vote-btn-${id}`}
        src={"/images/ui/arrow.png"}
        alt=""
        onClick={handleVoteCount}
      />
      <span role="vote-count" data-testid={`vote-count-${id}`}>
        {voteCount}
      </span>
    </div>
  );
}
