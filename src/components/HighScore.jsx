import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HighScore = ({ highScore }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const response = await axios.patch(
        `http://localhost:3000/users/${user._id}/stats`,
        {
          score: highScore,
          //add wins, losses, xp
        },
        {
          withCredentials: true,
        }
      );
      navigate("/leaderboard");
    })();
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-8">
      <h2>High Score: {highScore}</h2>
      {/* <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="bg-white border border-black text-black font-semibold text-md py-2 px-4 rounded-none"
          placeholder="Your Name"
        />
        <button className="bg-white ml-4 cursor-pointer hover:bg-yellow-400 border border-black text-black font-semibold text-md py-2 px-4 rounded-none">
          Save High Score
        </button>
      </form> */}
    </div>
  );
};

export default HighScore;
