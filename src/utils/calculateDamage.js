export const calculateDamage = (attacker, defender, isSpecial = false) => {
  const level = 50;
  const attackStat = isSpecial
    ? attacker.stats[3].base_stat
    : attacker.stats[1].base_stat;
  const defenseStat = isSpecial
    ? defender.stats[4].base_stat
    : defender.stats[2].base_stat;
  const randomFactor = 0.85 + Math.random() * 0.15;

  return Math.floor(
    ((2 * level) / 5 + 2) * (attackStat / defenseStat) * randomFactor
  );
};
