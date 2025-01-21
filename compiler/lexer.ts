// import { Token, LookupIdent, ILLEGAL, EOF, INT, STRING, ASSIGN, PLUS, MINUS, BANG, ASTERISK, SLASH, MOD, LT, GT, EQ, NOT_EQ, GTE, LTE, COMMA, SEMICOLON, LPAREN, RPAREN, LBRACE, RBRACE, LBRACKET, RBRACKET } from "./token";

// export class Lexer {
//   private input: string;
//   private position: number = 0;
//   private readPosition: number = 0;
//   private ch: string = "";

//   constructor(input: string) {
//     this.input = input;
//     this.readChar();
//   }

//   private readChar(): void {
//     if (this.readPosition >= this.input.length) {
//       this.ch = "\0";
//     } else {
//       this.ch = this.input[this.readPosition];
//     }
//     this.position = this.readPosition;
//     this.readPosition += 1;
//   }

//   private peekChar(): string {
//     if (this.readPosition >= this.input.length) {
//       return "\0";
//     } else {
//       return this.input[this.readPosition];
//     }
//   }

//   private skipWhitespace(): void {
//     while (this.ch === ' ' || this.ch === '\t' || this.ch === '\n' || this.ch === '\r') {
//       this.readChar();
//     }
//   }

//   public nextToken(): Token {
//     let tok: Token;
//     this.skipWhitespace();

//     switch (this.ch) {
//       case '=':
//         if (this.peekChar() === '=') {
//           const ch = this.ch;
//           this.readChar();
//           tok = { type: EQ, literal: ch + this.ch };
//         } else {
//           tok = { type: ASSIGN, literal: this.ch };
//         }
//         break;
//       case '+':
//         tok = { type: PLUS, literal: this.ch };
//         break;
//       case '-':
//         tok = { type: MINUS, literal: this.ch };
//         break;
//       case '!':
//         if (this.peekChar() === '=') {
//           const ch = this.ch;
//           this.readChar();
//           tok = { type: NOT_EQ, literal: ch + this.ch };
//         } else {
//           tok = { type: BANG, literal: this.ch };
//         }
//         break;
//       case '*':
//         tok = { type: ASTERISK, literal: this.ch };
//         break;
//       case '/':
//         tok = { type: SLASH, literal: this.ch };
//         break;
//       case '%':
//         tok = { type: MOD, literal: this.ch };
//         break;
//       case '<':
//         if (this.peekChar() === '=') {
//           const ch = this.ch;
//           this.readChar();
//           tok = { type: LTE, literal: ch + this.ch };
//         } else {
//           tok = { type: LT, literal: this.ch };
//         }
//         break;
//       case '>':
//         if (this.peekChar() === '=') {
//           const ch = this.ch;
//           this.readChar();
//           tok = { type: GTE, literal: ch + this.ch };
//         } else {
//           tok = { type: GT, literal: this.ch };
//         }
//         break;
//       case ',':
//         tok = { type: COMMA, literal: this.ch };
//         break;
//       case ';':
//         tok = { type: SEMICOLON, literal: this.ch };
//         break;
//       case '(':
//         tok = { type: LPAREN, literal: this.ch };
//         break;
//       case ')':
//         tok = { type: RPAREN, literal: this.ch };
//         break;
//       case '{':
//         tok = { type: LBRACE, literal: this.ch };
//         break;
//       case '}':
//         tok = { type: RBRACE, literal: this.ch };
//         break;
//       case '[':
//         tok = { type: LBRACKET, literal: this.ch };
//         break;
//       case ']':
//         tok = { type: RBRACKET, literal: this.ch };
//         break;
//       case '"':
//         tok = { type: STRING, literal: this.readString() };
//         break;
//       case '\0':
//         tok = { type: EOF, literal: "" };
//         break;
//       default:
//         if (this.isLetter(this.ch)) {
//           const literal = this.readIdentifier();
//           const type = LookupIdent(literal);
//           return { type, literal };
//         } else if (this.isDigit(this.ch)) {
//           return { type: INT, literal: this.readNumber() };
//         } else {
//           tok = { type: ILLEGAL, literal: this.ch };
//         }
//     }

//     this.readChar();
//     return tok;
//   }

//   private readIdentifier(): string {
//     const position = this.position;
//     while (this.isLetter(this.ch)) {
//       this.readChar();
//     }
//     return this.input.slice(position, this.position);
//   }

//   private readNumber(): string {
//     const position = this.position;
//     while (this.isDigit(this.ch)) {
//       this.readChar();
//     }
//     return this.input.slice(position, this.position);
//   }

//   private readString(): string {
//     const position = this.position + 1;
//     while (true) {
//       this.readChar();
//       if (this.ch === '"' || this.ch === '\0') {
//         break;
//       }
//     }
//     return this.input.slice(position, this.position);
//   }

//   private isLetter(ch: string): boolean {
//     return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch === '_';
//   }

//   private isDigit(ch: string): boolean {
//     return '0' <= ch && ch <= '9';
//   }
// }