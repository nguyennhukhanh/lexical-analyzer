const fs = require("fs");
const moo = require("moo");

const inputFilePath = "common/input.txt";
const outputFilePath = "common/output.txt";

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
});

const input = fs.readFileSync(inputFilePath, "utf-8");

const tokens = lexer.reset(input);

let output = "";
try {
  for (const token of tokens) {
    output += `${token.type.padEnd(12)} : ${token.value}\n`;
  }

  fs.writeFileSync(outputFilePath, output);
} catch (error) {
  console.error("Error: Invalid syntax - " + error.message);
}
