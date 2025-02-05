import React, { useState, useEffect } from "react";
import chooseRandomPokemon from "../utils/chooseRandomPokemon";

const calculateDamage = (attacker, defender, isSpecial = false) => {
  const level = 50;
  const attackStat = isSpecial ? attacker.specialAttack : attacker.attack;
  const defenseStat = isSpecial ? defender.specialDefense : defender.defense;
  const randomFactor = 0.85 + Math.random() * 0.15;

  return Math.floor(
    ((2 * level) / 5 + 2) * (attackStat / defenseStat) * randomFactor
  );
};

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
    let playerHp = player.hp;
    let opponentHp = opponent.hp;

    const firstAttacker = player.speed >= opponent.speed ? player : opponent;
    const secondAttacker = firstAttacker === player ? opponent : player;

    log.push(`Player: ${player.name} vs Cpu: ${opponent.name}!`);

    log.push(`${firstAttacker.name} attacks first!`);

    while (playerHp > 0 && opponentHp > 0) {
      const damageToSecond = calculateDamage(firstAttacker, secondAttacker);
      if (secondAttacker === player) {
        playerHp -= damageToSecond;
        log.push(
          `${firstAttacker.name} deals ${damageToSecond} damage to ${
            secondAttacker.name
          }. ${secondAttacker.name} has ${Math.max(playerHp, 0)} HP left.`
        );
      } else {
        opponentHp -= damageToSecond;
        log.push(
          `${firstAttacker.name} deals ${damageToSecond} damage to ${
            secondAttacker.name
          }. ${secondAttacker.name} has ${Math.max(opponentHp, 0)} HP left.`
        );
      }

      if (playerHp <= 0 || opponentHp <= 0) break;

      const damageToFirst = calculateDamage(secondAttacker, firstAttacker);
      if (firstAttacker === player) {
        playerHp -= damageToFirst;
        log.push(
          `${secondAttacker.name} deals ${damageToFirst} damage to ${
            firstAttacker.name
          }. ${firstAttacker.name} has ${Math.max(playerHp, 0)} HP left.`
        );
      } else {
        opponentHp -= damageToFirst;
        log.push(
          `${secondAttacker.name} deals ${damageToFirst} damage to ${
            firstAttacker.name
          }. ${firstAttacker.name} has ${Math.max(opponentHp, 0)} HP left.`
        );
      }
    }

    // Add the winner announcement to the log
    log.push(
      `Winner: ${
        playerHp > 0 ? `player's ${player.name}` : `cpu's ${opponent.name}`
      }!`
    );

    // Display log messages with a 2-second delay
    for (let i = 0; i < log.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      setBattleLog((prevLog) => [...prevLog, log[i]]);
    }

    // Set the winner after the log is fully displayed
    setWinner(
      playerHp > 0 ? `player's ${player.name}` : `cpu's ${opponent.name}`
    );
    setIsBattleRunning(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Pokémon Battle Simulator
      </h1>
      <button
        onClick={simulateBattle}
        disabled={isBattleRunning}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isBattleRunning ? "Battle in Progress..." : "Start Battle"}
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Battle Log:</h2>
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
        </div>
      )}
    </div>
  );
};

export default PokemonBattle;
