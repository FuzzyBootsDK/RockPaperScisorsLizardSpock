# Rock · Paper · Scissors · Lizard · Spock

The five-way version of the playground game, as a single page with no dependencies and no build
step. Open `index.html` in a browser and play.

```
index.html   markup, and the two references below it
styles.css   all styling
script.js    the rules and the game loop
```

## The rules are data, not branches

Five choices beat two others each, which is ten outcomes — enough that writing them as `if`
statements gets long and gets wrong. They live in one table instead:

```js
const WINS = {
  rock:     { scissors: 'crushes',      lizard:   'crushes'    },
  paper:    { rock:     'covers',        spock:    'disproves'  },
  scissors: { paper:    'cuts',          lizard:   'decapitates'},
  lizard:   { spock:    'poisons',       paper:    'eats'       },
  spock:    { scissors: 'smashes',       rock:     'vaporizes'  },
};
```

`WINS[a][b]` is truthy exactly when `a` beats `b`, so deciding a round is three lines:

```js
function getResult(player, cpu) {
  if (player === cpu) return 'draw';
  if (WINS[player][cpu]) return 'win';
  return 'lose';
}
```

The value is the verb, so the same table also writes the commentary — "Spock vaporizes Rock" is
read out of the data rather than stored in a second list that could disagree with the first. Adding
a sixth choice means adding a row and its verbs; nothing else changes.

## Notes

`script.js` is a classic deferred script rather than a module, because the buttons call `play()`
through inline `onclick` and those handlers resolve against `window` — a module's scope is its own,
and they would quietly stop working.

`styles.css` starts with `@charset "UTF-8"`. The disclosure markers in the rules section are `▾`
and `▴`, and a stylesheet served without a charset header does not inherit the document's encoding
the way an inline `<style>` block does.

## Why it exists

Written while working through a programming fundamentals course — a small, finished thing rather
than a half-built large one. It is kept here because the rules table is a tidy answer to a problem
that invites a messy one.
