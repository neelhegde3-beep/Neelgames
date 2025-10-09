const healthEl = document.getElementById("health");
const manaEl = document.getElementById("mana");
const goldEl = document.getElementById("gold");
const locationEl = document.getElementById("location");
const storyEl = document.getElementById("story");
const choicesEl = document.getElementById("choices");
const itemsEl = document.getElementById("items");

let player = {
  health: 100,
  mana: 50,
  gold: 0,
  inventory: [],
};

function updateStats() {
  healthEl.textContent = player.health;
  manaEl.textContent = player.mana;
  goldEl.textContent = player.gold;
  itemsEl.innerHTML = player.inventory.map(item => `<li>${item}</li>`).join("");
}

function showScene(location, story, choices) {
  locationEl.textContent = `📍 Location: ${location}`;
  storyEl.textContent = story;
  choicesEl.innerHTML = "";
  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => {
      choice.action();
      updateStats();
    };
    choicesEl.appendChild(btn);
  });
}

function startGame() {
  showScene("Enchanted Forest", 
    "You awaken beneath ancient trees. A path leads north to a castle, east to a cave.",
    [
      { text: "Go to the Castle", action: castleScene },
      { text: "Enter the Cave", action: caveScene },
      { text: "Search the Forest", action: () => {
        player.gold += 10;
        player.inventory.push("Herbs");
        showScene("Enchanted Forest", "You find some gold and herbs.", [
          { text: "Go to the Castle", action: castleScene },
          { text: "Enter the Cave", action: caveScene }
        ]);
      }}
    ]
  );
}

function castleScene() {
  showScene("Ancient Castle",
    "The castle gates creak open. A wizard offers you a potion for 20 gold.",
    [
      { text: "Buy Potion", action: () => {
        if (player.gold >= 20) {
          player.gold -= 20;
          player.inventory.push("Health Potion");
          showScene("Ancient Castle", "You buy the potion and feel stronger.", [
            { text: "Return to Forest", action: startGame },
            { text: "Explore Castle", action: throneRoom }
          ]);
        } else {
          showScene("Ancient Castle", "You don't have enough gold.", [
            { text: "Return to Forest", action: startGame }
          ]);
        }
      }},
      { text: "Explore Castle", action: throneRoom },
      { text: "Return to Forest", action: startGame }
    ]
  );
}

function throneRoom() {
  showScene("Throne Room",
    "A sleeping dragon guards a treasure chest.",
    [
      { text: "Fight the Dragon", action: () => {
        player.health -= 30;
        player.gold += 100;
        player.inventory.push("Dragon Scale");
        showScene("Throne Room", "You slay the dragon and claim the treasure!", [
          { text: "Return to Forest", action: startGame }
        ]);
      }},
      { text: "Sneak Past", action: () => {
        player.inventory.push("Mystic Key");
        showScene("Throne Room", "You sneak past and find a Mystic Key.", [
          { text: "Return to Forest", action: startGame }
        ]);
      }}
    ]
  );
}

function caveScene() {
  showScene("Shadowy Cave",
    "The cave is dark and damp. You hear whispers.",
    [
      { text: "Light a Torch", action: () => {
        player.mana -= 10;
        showScene("Shadowy Cave", "The torch reveals a hidden passage.", [
          { text: "Enter Passage", action: treasureRoom },
          { text: "Return to Forest", action: startGame }
        ]);
      }},
      { text: "Retreat", action: startGame }
    ]
  );
}

function treasureRoom() {
  showScene("Treasure Room",
    "You find a glowing sword and ancient scroll.",
    [
      { text: "Take Sword", action: () => {
        player.inventory.push("Glowing Sword");
        showScene("Treasure Room", "You feel its power surge through you.", [
          { text: "Return to Forest", action: startGame }
        ]);
      }},
      { text: "Read Scroll", action: () => {
        player.mana += 30;
        showScene("Treasure Room", "Your mind expands with magical knowledge.", [
          { text: "Return to Forest", action: startGame }
        ]);
      }}
    ]
  );
}

startGame();
