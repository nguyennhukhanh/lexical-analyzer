const fs = require("fs");

const inputFilePath = "common/input.txt";
const outputFilePath = "common/output.txt";

// const pattern =
//   /\b(while|if|else|return|break|continue|int|float|void)\b|\b[A-Za-z_][A-Za-z0-9_]*\b|\b\d+(\.\d+)?([Ee][+\-]?\d+)?\b|[+\-*/<>=!]=?|&&|\|\||[(){}\[\];,]|\/\/.*?$|[ \t]+|\s+/g;

const pattern = new RegExp(
  [
    "\\b(while|if|else|return|break|continue|int|float|void)\\b", // keywords
    "\\b[A-Za-z_][A-Za-z0-9_]*\\b", // identifiers
    "\\b\\d+(\\.\\d+)?([Ee][+\\-]?\\d+)?\\b", // numbers
    "[+\\-*/<>=!]=?", // operators
    "&&|\\|\\|", // logical operators
    "[(){}\\[\\];,]", // punctuation
    "\\/\\/.*?$", // comments
    "[ \\t]+", // whitespace
    "\\s+", // other spaces
  ].join("|"),
  "g",
);

const input = fs.readFileSync(inputFilePath, "utf-8");

let output = "";
let match;
while ((match = pattern.exec(input)) !== null) {
  const token = match[0];
  let type;

  if (/^\s+$/.test(token)) {
    type = "WS";
  } else if (/^\/\/.*?$/.test(token)) {
    type = "comment";
  } else if (
    /^-?(?:[0-9]*\.[0-9]+|[0-9]+\.?[0-9]*(?:[Ee][+-]?[0-9]+)?)$/.test(token)
  ) {
    type = "number";
  } else if (/^"(?:\\["\\]|[^\n"\\])*"$/.test(token)) {
    type = "string";
  } else if (/^[+\-*/<>=!]=?$/.test(token)) {
    type = "operator";
  } else if (
    /^(while|if|else|return|break|continue|int|float|void)$/.test(token)
  ) {
    type = "keyword";
  } else if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(token)) {
    type = "identifier";
  } else {
    type = token;
  }

  output += `${type.padEnd(12)} : ${token}\n`;
}

fs.writeFileSync(outputFilePath, output);
