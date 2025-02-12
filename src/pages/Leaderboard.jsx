import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverScores, setServerScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/leaderboard");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const serverScores = await response.json();
        setServerScores(serverScores);

        // Get current game data from localStorage without parsing username
        const wins = JSON.parse(localStorage.getItem("wins")) || 0;
        const xp = JSON.parse(localStorage.getItem("xp")) || 0;
        const username = localStorage.getItem("username") || "Player"; // Removed JSON.parse

        // Debug: Log the values
        console.log("Retrieved from localStorage:", {
          username,
          wins,
          xp,
        });

        // Create current player score object
        const currentPlayerScore = {
          player_name: username,
          score: xp,
          wins: wins,
        };

        // Ensure serverScores is an array and add current player's score
        const allScores = Array.isArray(serverScores) ? [...serverScores] : [];
        const playerExists = allScores.findIndex(
          (score) => score.player_name === currentPlayerScore.player_name
        );

        if (playerExists === -1) {
          allScores.push(currentPlayerScore);
        } else {
          if (allScores[playerExists].score < currentPlayerScore.score) {
            allScores[playerExists] = currentPlayerScore;
          }
        }

        const sortedScores = allScores.sort((a, b) => b.score - a.score);
        setScores(sortedScores);
        setError(null);
      } catch (error) {
        console.error("Error fetching scores:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <section className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <img
        src="/trophy.png"
        alt="Hero"
        className="h-32 w-auto mx-auto mb-8 rounded-3xl"
      />
      <h2 className="text-2xl font-bold mb-4 text-center">
        Pokémon Battle: Leaderboard
      </h2>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-yellow-400">
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Player</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Wins</th>
                <th className="px-4 py-2">Losses</th>
                <th className="px-4 py-2">Ratio</th>
                <th className="px-4 py-2">Games</th>
                <th className="px-4 py-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {serverScores["top10Leaderboard"].map((score, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-yellow-100`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{score.user_id.username}</td>
                  <td className="px-4 py-2 text-right">
                    {score.user_id.score}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {score.user_id.wins || 0}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {score.user_id.losses || 0}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {score.user_id.winLossRatio || 0}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {score.user_id.gamesPlayed || 0}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <img src={score.user_id.image} alt="" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
