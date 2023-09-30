const fs = require("fs");
const moo = require("moo");

const inputFilePath = "common/input.txt";
const outputFilePath = "common/output.txt";

// Defines lexer rules
const lexer = moo.compile({
  WS: /[ \t]+/,
  comment: /\/\/.*?$/,
  number: /-?(?:[0-9]*\.[0-9]+|[0-9]+\.?[0-9]*(?:[Ee][+-]?[0-9]+)?)/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  lparen: "(",
  rparen: ")",
  lbrace: "{",
  rbrace: "}",
  comma: ",",
  semicolon: ";",
  keyword: [
    "void",
    "int",
    "for",
    "if",
    "else",
    "while",
    "do",
    "return",
    "break",
    "continue",
  ],
  identifier: /[a-zA-Z_][a-zA-Z_0-9]*/,
  operator: [
    "+",
    "-",
    "*",
    "/",
    "=",
    "<",
    ">",
    "==",
    "!=",
    "<=",
    ">=",
    "&&",
    "||",
    "!",
  ],
  SPACE: { match: /\s+/, lineBreaks: true },

  // Catch error
  invalid: {
    match: /\.\.|,,|;;|\)[^\(]*\)|\}[^{]*\}/,
    error: moo.error,
  },
});

// Read input from file
const input = fs.readFileSync(inputFilePath, "utf-8");

// Lexical analysis
const tokens = lexer.reset(input);

let output = "";
try {
  for (const token of tokens) {
    output += `${token.type.padEnd(12)} : ${token.value}\n`;
  }

  // Write file
  fs.writeFileSync(outputFilePath, output);
} catch (error) {
  console.error("Error: Invalid syntax - " + error.message);
}
