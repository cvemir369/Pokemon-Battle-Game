import React from "react";
import { Link } from "react-router-dom";

const BattleSimulator = ({ player, opponent, battleLog, winner }) => {
  return (
    <div className="flex flex-col p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Pokémon Battle Simulator
      </h1>
      <div className="flex gap-4 justify-center">
        <div>
          <h3 className="text-xl font-bold text-center">Player</h3>
          {player && (
            <>
              <img
                src={player.sprites.front_default}
                alt={player.name}
                className="w-32 h-32"
              />
              <p className="text-xl font-bold text-center">{player.name}</p>
            </>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-center">Cpu</h3>
          {opponent && (
            <>
              <img
                src={opponent.sprites.front_default}
                alt={opponent.name}
                className="w-32 h-32"
              />
              <p className="text-xl font-bold text-center">{opponent.name}</p>
            </>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-center mb-2">Battle Log:</h2>
        <div className="bg-gray-100 p-4 rounded max-h-60 overflow-y-auto">
          {battleLog.map((entry, index) => (
            <p key={index} className="text-sm">
              {entry}
            </p>
          ))}
        </div>
      </div>
      {winner && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold">Winner: {winner}!</h2>
          <div className="flex flex-col items-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-white mt-5 cursor-pointer hover:bg-yellow-400 border border-black text-black font-semibold text-md py-2 px-4 rounded-none"
            >
              Play again
            </button>
            <Link
              to="/"
              className="cursor-pointer hover:underline text-black font-semibold text-md p-2 px-4 rounded-none"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleSimulator;
