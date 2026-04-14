
// TRANCISION DE TEXTO (APARECE DE ABAJO HACIA ARRIBA)
// ----------------------------------------------------
const revealEls = document.querySelectorAll('.aparecer');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('listo');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));



// VISUAL QUE ESCRIBE SOLO. CURSOR TITILANDO
// ----------------------------------------------------
const tagline   = 'Tu auto limpio mientras estudias.';
const twEl      = document.getElementById('escribe_solo');
const glyphPool = '01!?@#$%&<>{}[]|\\/=+-*^~_░▒▓';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function scrambleChar(prefix, realChar) {
  // Flash 3 random glyphs before landing on the real character
  for (let k = 0; k < 3; k++) {
    twEl.textContent = prefix + glyphPool[Math.floor(Math.random() * glyphPool.length)];
    await sleep(32);
  }
  twEl.textContent = prefix + realChar;
}

async function startTypewriterLoop() {
  await sleep(400);

  while (true) {
    // Type forward with scramble effect
    for (let i = 0; i < tagline.length; i++) {
      await scrambleChar(tagline.slice(0, i), tagline[i]);
      await sleep(45 + Math.random() * 30);
    }

    // Hold 5 seconds
    await sleep(5000);

    // Erase backward (clean, no scramble)
    for (let i = tagline.length; i >= 0; i--) {
      twEl.textContent = tagline.slice(0, i);
      await sleep(25 + Math.random() * 15);
    }

    // Brief pause before retyping
    await sleep(600);
  }
}

startTypewriterLoop();