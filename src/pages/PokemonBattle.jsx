import React, { useState, useEffect } from "react";
import chooseRandomPokemon from "../utils/chooseRandomPokemon.js";
import { calculateDamage } from "../utils/calculateDamage.js";

const PokemonBattle = () => {
  const [battleLog, setBattleLog] = useState([]);
  const [winner, setWinner] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isBattleRunning, setIsBattleRunning] = useState(false);

  useEffect(() => {
    const fetchOpponent = async () => {
      const randomOpponent = await chooseRandomPokemon();
      setOpponent(randomOpponent);
    };

    const fetchPlayer = async () => {
      const randomPlayer = await chooseRandomPokemon();
      setPlayer(randomPlayer);
    };

    fetchPlayer();
    fetchOpponent();
  }, []);

  const simulateBattle = async () => {
    if (!opponent || !player || isBattleRunning) return;

    setIsBattleRunning(true);
    setBattleLog([]);
    setWinner(null);

    let log = [];
    let playerHp = player.stats[0].base_stat;
    let opponentHp = opponent.stats[0].base_stat;

    const firstAttacker =
      player.stats[5].base_stat >= opponent.stats[5].base_stat
        ? player
        : opponent;
    const secondAttacker = firstAttacker === player ? opponent : player;

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
    log.push(`Winner: ${playerHp > 0 ? player.name : opponent.name}!`);

    // Display log messages with a 2-second delay
    for (let i = 0; i < log.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      setBattleLog((prevLog) => [...prevLog, log[i]]);
    }

    // Set the winner after the log is fully displayed
    setWinner(playerHp > 0 ? player.name : opponent.name);
    setIsBattleRunning(false);
  };

  return (
    <div className="bg-yellow-400 min-h-screen mt-2 pt-8">
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
        <button
          onClick={simulateBattle}
          disabled={isBattleRunning}
          className="bg-white hover:bg-yellow-100 border border-black text-black font-bold py-2 px-4 rounded-non"
        >
          {isBattleRunning ? "Battle in Progress..." : "Start Battle"}
        </button>
        {isBattleRunning && (
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
        )}
        {winner && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold">Winner: {winner}!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonBattle;
