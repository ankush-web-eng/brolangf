import { Lexer } from './lexer';
import { Token, TokenType, EOF, IDENT, INT, STRING, TRUE, FALSE, LPAREN, RPAREN, SEMICOLON } from './token';
import * as AST from './ast';

export class Parser {
    private lexer: Lexer;
    private curToken!: Token;
    private peekToken!: Token;
    public errors: string[];

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.errors = [];
        this.nextToken();
        this.nextToken();
    }

    private nextToken(): void {
        this.curToken = this.peekToken;
        this.peekToken = this.lexer.nextToken();
    }

    private parsePrintStatement(): AST.PrintStatement | null {
        const stmt = new AST.PrintStatement(this.curToken);
        
        if (!this.expectPeek(LPAREN)) {
            return null;
        }
        
        this.nextToken();
        
        if (this.curTokenIs(RPAREN)) {
            this.nextToken();
            return stmt;
        }
        
        const expression = this.parseExpression();
        if (!expression) {
            return null;
        }
        
        stmt.expression = expression;
        
        if (!this.expectPeek(RPAREN)) {
            return null;
        }
        
        if (this.peekTokenIs(SEMICOLON)) {
            this.nextToken();
        }
        
        return stmt;
    }

    private parseExpression(): AST.Expression | null {
        switch (this.curToken.type) {
            case INT:
                return this.parseIntegerLiteral();
            case STRING:
                return this.parseStringLiteral();
            case TRUE:
            case FALSE:
                return this.parseBoolean();
            case IDENT:
                return this.parseIdentifier();
            default:
                return null;
        }
    }

    private curTokenIs(type: TokenType): boolean {
        return this.curToken.type === type;
    }

    private peekTokenIs(type: TokenType): boolean {
        return this.peekToken.type === type;
    }

    private expectPeek(type: TokenType): boolean {
        if (this.peekTokenIs(type)) {
            this.nextToken();
            return true;
        } else {
            this.peekError(type);
            return false;
        }
    }

    private peekError(type: TokenType): void {
        const msg = `expected next token to be ${type}, got ${this.peekToken.type} instead`;
        this.errors.push(msg);
    }
}