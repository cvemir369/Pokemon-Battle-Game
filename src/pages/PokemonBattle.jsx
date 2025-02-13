import React, { useState, useEffect } from "react";
import chooseRandomPokemon from "../utils/chooseRandomPokemon.js";
import { calculateDamage } from "../utils/calculateDamage.js";
import BattleRoster from "../components/BattleRoster";
import BattleSimulator from "../components/BattleSimulator";
import HighScore from "../components/HighScore.jsx";
import pokemonService from "../services/pokemonService";

const PokemonBattle = () => {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [battleLog, setBattleLog] = useState([]);
  const [winner, setWinner] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isBattleRunning, setIsBattleRunning] = useState(false);
  const [roster, setRoster] = useState([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [wins, setWins] = useState(
    JSON.parse(localStorage.getItem("wins")) || 0
  );
  const [losses, setLosses] = useState(
    JSON.parse(localStorage.getItem("losses")) || 0
  );
  const [xp, setXp] = useState(JSON.parse(localStorage.getItem("xp")) || 0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.roster) {
      setPokemonIds(storedUser.roster);
    }
  }, []);

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const rosterData = await Promise.all(
          pokemonIds.map((id) => pokemonService.getPokemonById(id))
        );
        setRoster(rosterData);
      } catch (error) {
        console.error("Error fetching roster:", error);
      }
    };
    if (pokemonIds.length > 0) {
      fetchRoster();
    }
  }, [pokemonIds]);

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
      await new Promise((resolve) => setTimeout(resolve, 500)); // 2-second delay
      setBattleLog((prevLog) => [...prevLog, log[i]]);
    }

    // Set the winner after the log is fully displayed
    const battleWinner = playerHp > 0 ? player.name : randomOpponent.name;
    setWinner(battleWinner);
    if (battleWinner === player.name) {
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
          <BattleRoster
            roster={roster}
            selectedPokemonId={selectedPokemonId}
            setPlayer={setPlayer}
            setSelectedPokemonId={setSelectedPokemonId}
          />
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
        <BattleSimulator
          player={player}
          opponent={opponent}
          battleLog={battleLog}
          winner={winner}
        />
      )}
      {winner && <HighScore highScore={xp} />}
    </div>
  );
};

export default PokemonBattle;
