let health = {
  fighter1: 100,
  fighter2: 100
};

function attack(target) {
  const attacker = target === 'fighter1' ? 'fighter2' : 'fighter1';
  const damage = Math.floor(Math.random() * 20) + 5;
  health[target] -= damage;
  health[target] = Math.max(0, health[target]);

  document.getElementById(`health${target === 'fighter1' ? 1 : 2}`).style.width = `${health[target]}%`;

  const log = document.getElementById('log');
  log.innerText = `${attacker} attacks ${target} for ${damage} damage!`;

  if (health[target] === 0) {
    log.innerText += `\n${target} is defeated! ${attacker} wins!`;
    disableButtons();
  }
}

function disableButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = true);
}
