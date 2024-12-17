export type TokenType = string;

export interface Token {
    type: TokenType;
    literal: string;
}

export const ILLEGAL: TokenType = "ILLEGAL";
export const EOF: TokenType = "EOF";

export const IDENT: TokenType = "IDENT";
export const INT: TokenType = "INT";
export const STRING: TokenType = "STRING";
export const BOOL: TokenType = "BOOL";
 
export const ASSIGN: TokenType = "=";
export const PLUS: TokenType = "+";
export const MINUS: TokenType = "-";
export const BANG: TokenType = "!";
export const ASTERISK: TokenType = "*";
export const SLASH: TokenType = "/";
export const MOD: TokenType = "%";
 
export const LT: TokenType = "<";
export const GT: TokenType = ">";
export const EQ: TokenType = "==";
export const NOT_EQ: TokenType = "!=";
export const GTE: TokenType = ">=";
export const LTE: TokenType = "<=";
 
export const COMMA: TokenType = ",";
export const SEMICOLON: TokenType = ";";
export const LPAREN: TokenType = "(";
export const RPAREN: TokenType = ")";
export const LBRACE: TokenType = "{";
export const RBRACE: TokenType = "}";
export const LBRACKET: TokenType = "[";
export const RBRACKET: TokenType = "]";
 
export const LET: TokenType = "bhai_sun";
export const PRINT: TokenType = "bol_bhai";
export const INPUT: TokenType = "suna_bhai";
export const IF: TokenType = "agar";
export const ELSE: TokenType = "nahi_to";
export const ELSE_IF: TokenType = "nahi_to_agar";
export const WHILE: TokenType = "jaha_tak";
export const FOR: TokenType = "chal_bhai";
export const TRUE: TokenType = "sach";
export const FALSE: TokenType = "jhuth";
export const BREAK: TokenType = "bas_kar_bhai";
export const CONTINUE: TokenType = "aage_bhad_bhai";
 
export const keywords: { [key: string]: TokenType } = {
    "bhai_sun": LET,
    "bol_bhai": PRINT,
    "suna_bhai": INPUT,
    "agar": IF,
    "nahi_to": ELSE,
    "nahi_to_agar": ELSE_IF,
    "jaha_tak": WHILE,
    "chal_bhai": FOR,
    "sach": TRUE,
    "jhuth": FALSE,
    "bas_kar_bhai": BREAK,
    "aage_bhad_bhai": CONTINUE,
};

export function LookupIdent(ident: string): TokenType {
    if (keywords.hasOwnProperty(ident)) {
        return keywords[ident];
    }
    return IDENT;
}