import React, { useState, useEffect } from "react";
import chooseRandomPokemon from "../utils/chooseRandomPokemon.js";
import { calculateDamage } from "../utils/calculateDamage.js";
import { Link } from "react-router-dom";

const PokemonBattle = () => {
  const [battleLog, setBattleLog] = useState([]);
  const [winner, setWinner] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isBattleRunning, setIsBattleRunning] = useState(false);
  const [roster, setRoster] = useState(
    JSON.parse(localStorage.getItem("roster")) || []
  );
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [wins, setWins] = useState(
    JSON.parse(localStorage.getItem("wins")) || 0
  );
  const [losses, setLosses] = useState(
    JSON.parse(localStorage.getItem("losses")) || 0
  );
  const [xp, setXp] = useState(JSON.parse(localStorage.getItem("xp")) || 0);

  useEffect(() => {
    if (player) {
      const fetchOpponent = async () => {
        const randomOpponent = await chooseRandomPokemon();
        setOpponent(randomOpponent);
      };
      fetchOpponent();
    }
  }, [player]);

  const simulateBattle = async () => {
    if (!player || isBattleRunning) return;

    setIsBattleRunning(true);
    setBattleLog([]);
    setWinner(null);

    const randomOpponent = await chooseRandomPokemon();
    setOpponent(randomOpponent);

    let log = [];
    let playerHp = player.stats[0].base_stat;
    let opponentHp = randomOpponent.stats[0].base_stat;

    const firstAttacker =
      player.stats[5].base_stat >= randomOpponent.stats[5].base_stat
        ? player
        : randomOpponent;
    const secondAttacker = firstAttacker === player ? randomOpponent : player;

    log.push(`${firstAttacker.name} attacks first!`);

    while (playerHp > 0 && opponentHp > 0) {
      const damageToSecond = calculateDamage(firstAttacker, secondAttacker);
      if (secondAttacker === player) {
        playerHp -= damageToSecond;
        log.push(
          `🔥 ${firstAttacker.name} deals ${damageToSecond} damage to ${
            secondAttacker.name
          }. ${secondAttacker.name} has ${Math.max(playerHp, 0)} HP left.`
        );
      } else {
        opponentHp -= damageToSecond;
        log.push(
          `🔥 ${firstAttacker.name} deals ${damageToSecond} damage to ${
            secondAttacker.name
          }. ${secondAttacker.name} has ${Math.max(opponentHp, 0)} HP left.`
        );
      }

      if (playerHp <= 0 || opponentHp <= 0) break;

      const damageToFirst = calculateDamage(secondAttacker, firstAttacker);
      if (firstAttacker === player) {
        playerHp -= damageToFirst;
        log.push(
          `🔥 ${secondAttacker.name} deals ${damageToFirst} damage to ${
            firstAttacker.name
          }. ${firstAttacker.name} has ${Math.max(playerHp, 0)} HP left.`
        );
      } else {
        opponentHp -= damageToFirst;
        log.push(
          `🔥 ${secondAttacker.name} deals ${damageToFirst} damage to ${
            firstAttacker.name
          }. ${firstAttacker.name} has ${Math.max(opponentHp, 0)} HP left.`
        );
      }
    }

    // Add the winner announcement to the log
    log.push(`Winner: ${playerHp > 0 ? player.name : randomOpponent.name}!`);

    // Display log messages with a 2-second delay
    for (let i = 0; i < log.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      setBattleLog((prevLog) => [...prevLog, log[i]]);
    }

    // Set the winner after the log is fully displayed
    setWinner(playerHp > 0 ? player.name : randomOpponent.name);
    if (winner == player.name) {
      setWins(wins + 1);
      localStorage.setItem("wins", JSON.stringify(wins + 1));
      setXp(xp + 10 + playerHp);
      localStorage.setItem("xp", JSON.stringify(xp + 10 + playerHp));
    } else {
      setLosses(losses + 1);
      localStorage.setItem("losses", JSON.stringify(losses + 1));
    }

    setIsBattleRunning(false);
  };

  return (
    <div className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <div className="container mx-auto px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Battle vs Random Pokémon</h1>
        {!isBattleRunning && !winner && roster.length === 0 && (
          <p className="text-gray-500">You haven't added any Pokémon yet!</p>
        )}
        {!isBattleRunning && !winner && roster.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roster.map((pokemon) => (
              <li
                key={pokemon.id}
                className={`flex flex-col items-center p-4 shadow-lg rounded-lg cursor-pointer hover:outline-2 hover:outline-red-500 hover:shadow-xl ${
                  selectedPokemonId === pokemon.id
                    ? "shadow-xl bg-red-100 outline-2 outline-red-500"
                    : "bg-white"
                }`}
                onClick={() => {
                  setPlayer(pokemon.pokemon);
                  setSelectedPokemonId(pokemon.id);
                }}
              >
                <img
                  src={pokemon.pokemon.sprites.front_default}
                  alt={pokemon.pokemon.name}
                  className="w-24 h-24 object-cover mb-2"
                />
                <span className="text-lg font-semibold capitalize">
                  {pokemon.pokemon.name}
                </span>
              </li>
            ))}
          </ul>
        )}
        {!isBattleRunning && !winner && (
          <button
            onClick={simulateBattle}
            disabled={!player}
            className="bg-white mt-8 cursor-pointer hover:bg-yellow-400 border border-black text-black font-semibold text-md py-2 px-4 rounded-none"
          >
            {player ? "Start Battle" : "Choose a Pokémon to Start Battle"}
          </button>
        )}
      </div>
      {(isBattleRunning || winner) && (
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
                  <p className="text-xl font-bold text-center">
                    {opponent.name}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-center mb-2">
              Battle Log:
            </h2>
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
      )}
    </div>
  );
};

export default PokemonBattle;
