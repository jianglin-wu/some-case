const path = require('path');

module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{html,js}"
  ],
  "swDest": path.resolve(__dirname, "dist/sw.js"),
  "swSrc": path.resolve(__dirname, "src/sw.js")
};
