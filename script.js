const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const EMOJI = {
  rock:     '✊',
  paper:    '✋',
  scissors: '✌️',
  lizard:   '🦎',
  spock:    '🖖',
};

// wins[a] = list of choices that a beats, with a verb for each
const WINS = {
  rock:     { scissors: 'crushes',      lizard:   'crushes'    },
  paper:    { rock:     'covers',        spock:    'disproves'  },
  scissors: { paper:    'cuts',          lizard:   'decapitates'},
  lizard:   { spock:    'poisons',       paper:    'eats'       },
  spock:    { scissors: 'smashes',       rock:     'vaporizes'  },
};

let scores = { player: 0, cpu: 0, draws: 0 };

function cpuPick() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function getResult(player, cpu) {
  if (player === cpu) return 'draw';
  if (WINS[player][cpu]) return 'win';
  return 'lose';
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function play(playerChoice) {
  const cpu = cpuPick();
  const result = getResult(playerChoice, cpu);

  const playerDisplay = document.getElementById('playerDisplay');
  const cpuDisplay    = document.getElementById('cpuDisplay');
  const resultMsg     = document.getElementById('resultMsg');
  const resultDetail  = document.getElementById('resultDetail');

  playerDisplay.textContent = EMOJI[playerChoice];
  cpuDisplay.textContent    = EMOJI[cpu];

  // Reset classes
  playerDisplay.className = 'choice-display';
  cpuDisplay.className    = 'choice-display';
  resultMsg.className     = 'result-msg';

  if (result === 'win') {
    scores.player++;
    playerDisplay.classList.add('win');
    cpuDisplay.classList.add('lose');
    resultMsg.classList.add('win');
    resultMsg.textContent = 'You Win!';
    resultDetail.textContent =
      `${capitalize(playerChoice)} ${WINS[playerChoice][cpu]} ${capitalize(cpu)}`;
  } else if (result === 'lose') {
    scores.cpu++;
    playerDisplay.classList.add('lose');
    cpuDisplay.classList.add('win');
    resultMsg.classList.add('lose');
    resultMsg.textContent = 'You Lose!';
    resultDetail.textContent =
      `${capitalize(cpu)} ${WINS[cpu][playerChoice]} ${capitalize(playerChoice)}`;
  } else {
    scores.draws++;
    playerDisplay.classList.add('draw');
    cpuDisplay.classList.add('draw');
    resultMsg.classList.add('draw');
    resultMsg.textContent = "It's a Draw!";
    resultDetail.textContent = `Both picked ${capitalize(playerChoice)}`;
  }

  document.getElementById('scorePlayer').textContent = scores.player;
  document.getElementById('scoreCPU').textContent    = scores.cpu;
  document.getElementById('scoreDraws').textContent  = scores.draws;
}

function resetScore() {
  scores = { player: 0, cpu: 0, draws: 0 };
  document.getElementById('scorePlayer').textContent = 0;
  document.getElementById('scoreCPU').textContent    = 0;
  document.getElementById('scoreDraws').textContent  = 0;

  const playerDisplay = document.getElementById('playerDisplay');
  const cpuDisplay    = document.getElementById('cpuDisplay');
  playerDisplay.textContent = '?';
  cpuDisplay.textContent    = '?';
  playerDisplay.className   = 'choice-display';
  cpuDisplay.className      = 'choice-display';

  document.getElementById('resultMsg').textContent    = '';
  document.getElementById('resultMsg').className      = 'result-msg';
  document.getElementById('resultDetail').textContent = '';
}
