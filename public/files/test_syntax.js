const fs = require('fs');

const jsContent = fs.readFileSync('lib/kata2.js', 'utf8');

// We want to test if the JS is syntactically valid. 
// We can just try to parse it using the `vm` module or `eval`.
try {
  require('vm').Script(jsContent);
  console.log("Syntax is VALID!");
} catch (e) {
  console.error("Syntax ERROR:", e);
}
