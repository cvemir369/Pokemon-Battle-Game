import React, { useState } from "react";

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

  const pikachu = {
    name: "Pikachu",
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
  };

  const opponent = {
    name: "Charmander",
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
  };

  const simulateBattle = () => {
    let log = [];
    let pikachuHp = pikachu.hp;
    let opponentHp = opponent.hp;

    const firstAttacker = pikachu.speed >= opponent.speed ? pikachu : opponent;
    const secondAttacker = firstAttacker === pikachu ? opponent : pikachu;

    log.push(`${firstAttacker.name} attacks first!`);

    while (pikachuHp > 0 && opponentHp > 0) {
      const damageToSecond = calculateDamage(firstAttacker, secondAttacker);
      if (secondAttacker === pikachu) {
        pikachuHp -= damageToSecond;
        log.push(
          `${firstAttacker.name} deals ${damageToSecond} damage to ${
            secondAttacker.name
          }. ${secondAttacker.name} has ${Math.max(pikachuHp, 0)} HP left.`
        );
      } else {
        opponentHp -= damageToSecond;
        log.push(
          `${firstAttacker.name} deals ${damageToSecond} damage to ${
            secondAttacker.name
          }. ${secondAttacker.name} has ${Math.max(opponentHp, 0)} HP left.`
        );
      }

      if (pikachuHp <= 0 || opponentHp <= 0) break;

      const damageToFirst = calculateDamage(secondAttacker, firstAttacker);
      if (firstAttacker === pikachu) {
        pikachuHp -= damageToFirst;
        log.push(
          `${secondAttacker.name} deals ${damageToFirst} damage to ${
            firstAttacker.name
          }. ${firstAttacker.name} has ${Math.max(pikachuHp, 0)} HP left.`
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

    setBattleLog(log);
    setWinner(pikachuHp > 0 ? pikachu.name : opponent.name);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Pokémon Battle Simulator
      </h1>
      <button
        onClick={simulateBattle}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Start Battle
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
