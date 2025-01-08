import { Lexer } from './lexer';
import { Token, TokenType, EOF, IDENT, ASSIGN, SEMICOLON, LET, PRINT, IF, WHILE, FOR, BREAK, CONTINUE, LPAREN, RPAREN, LBRACE, RBRACE, COMMA, GT, LT, EQ, NOT_EQ, GTE, LTE, PLUS, MINUS, ASTERISK, SLASH, MOD, TRUE, FALSE, INT, STRING, ELSE_IF, ELSE } from './token';
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

    public parseProgram(): AST.Program {
        const program = new AST.Program();
        while (!this.curTokenIs(EOF)) {
            const stmt = this.parseStatement();
            if (stmt != null) {
                program.statements.push(stmt);
            }
            this.nextToken();
        }
        return program;
    }

    private parseStatement(): AST.Statement | null {
        switch (this.curToken.type) {
            case LET:
                return this.parseLetStatement();
            case IDENT:
                if (this.peekTokenIs(ASSIGN)) {
                    return this.parseAssignStatement();
                }
                return this.parseExpressionStatement();
            case PRINT:
                return this.parsePrintStatement();
            case IF:
                return this.parseIfExpression();
            case WHILE:
                return this.parseWhileExpression();
            case FOR:
                return this.parseForExpression();
            case BREAK:
                return new AST.BreakStatement(this.curToken);
            case CONTINUE:
                return new AST.ContinueStatement(this.curToken);
            case SEMICOLON:
                this.nextToken();
                return null;
            default:
                return this.parseExpressionStatement();
        }
    }

    private parseAssignStatement(): AST.AssignStatement | null {
        const token = this.curToken;
        if (!this.expectPeek(IDENT)) {
            return null;
        }

        const name = new AST.Identifier(this.curToken, this.curToken.literal);

        if (!this.expectPeek(ASSIGN)) {
            return null;
        }

        this.nextToken();

        const value = this.parseExpression();

        if (this.peekTokenIs(SEMICOLON)) {
            this.nextToken();
        }

        return new AST.AssignStatement(token, name, value!);
    }

    private parsePrintStatement(): AST.PrintStatement | null {
        const stmt = new AST.PrintStatement(this.curToken);
        if (!this.expectPeek(LPAREN)) {
            return null;
        }
        this.nextToken();
        stmt.expression = this.parseExpression();
        if (!this.expectPeek(RPAREN)) {
            return null;
        }
        if (this.peekTokenIs(SEMICOLON)) {
            this.nextToken();
        }
        return stmt;
    }

    private parseLetStatement(): AST.LetStatement | null {
        const stmt = new AST.LetStatement(this.curToken);
        if (!this.expectPeek(IDENT)) {
            return null;
        }
        stmt.name = new AST.Identifier(this.curToken, this.curToken.literal);
        if (!this.expectPeek(ASSIGN)) {
            return null;
        }
        this.nextToken();
        stmt.value = this.parseExpression();
        return stmt;
    }

    private parseIfExpression(): AST.IfExpression | null {
        const expression = new AST.IfExpression(this.curToken);
        if (!this.expectPeek(LPAREN)) {
            return null;
        }
        this.nextToken();
        expression.condition = this.parseSimpleExpression();
        if (!this.expectPeek(RPAREN)) {
            return null;
        }
        if (!this.expectPeek(LBRACE)) {
            return null;
        }
        expression.consequence = this.parseBlockStatement();
        while (this.peekTokenIs(ELSE_IF)) {
            this.nextToken();
            const elseIfExp = new AST.IfExpression(this.curToken);
            if (!this.expectPeek(LPAREN)) {
                return null;
            }
            this.nextToken();
            elseIfExp.condition = this.parseSimpleExpression();
            if (!this.expectPeek(RPAREN)) {
                return null;
            }
            if (!this.expectPeek(LBRACE)) {
                return null;
            }
            elseIfExp.consequence = this.parseBlockStatement();
            expression.elseIf.push(elseIfExp);
        }
        if (this.peekTokenIs(ELSE)) {
            this.nextToken();
            if (!this.expectPeek(LBRACE)) {
                return null;
            }
            expression.alternative = this.parseBlockStatement();
        }
        return expression;
    }

    private parseWhileExpression(): AST.WhileExpression | null {
        const expression = new AST.WhileExpression(this.curToken);
        if (!this.expectPeek(LPAREN)) {
            return null;
        }
        this.nextToken();
        expression.condition = this.parseSimpleExpression();
        if (!this.expectPeek(RPAREN)) {
            return null;
        }
        if (!this.expectPeek(LBRACE)) {
            return null;
        }
        expression.body = this.parseBlockStatement();
        return expression;
    }

    private parseForExpression(): AST.ForExpression | null {
        const expression = new AST.ForExpression(this.curToken);
        if (!this.expectPeek(LPAREN)) {
            return null;
        }
        this.nextToken();
        if (!this.curTokenIs(SEMICOLON)) {
            expression.init = this.parseStatement();
        }
        if (!this.expectPeek(SEMICOLON)) {
            return null;
        }
        this.nextToken();
        if (!this.curTokenIs(SEMICOLON)) {
            expression.condition = this.parseSimpleExpression();
        }
        if (!this.expectPeek(SEMICOLON)) {
            return null;
        }
        this.nextToken();
        if (!this.curTokenIs(RPAREN)) {
            expression.update = this.parseStatement();
        }
        if (!this.expectPeek(RPAREN)) {
            return null;
        }
        if (!this.expectPeek(LBRACE)) {
            return null;
        }
        expression.body = this.parseBlockStatement();
        return expression;
    }

    private parseBlockStatement(): AST.BlockStatement {
        const block = new AST.BlockStatement(this.curToken);
        block.statements = [];
        this.nextToken();
        while (!this.curTokenIs(RBRACE) && !this.curTokenIs(EOF)) {
            const stmt = this.parseStatement();
            if (stmt != null) {
                block.statements.push(stmt);
            }
            this.nextToken();
        }
        return block;
    }

    private parseExpressionStatement(): AST.ExpressionStatement {
        const stmt = new AST.ExpressionStatement(this.curToken);
        stmt.expression = this.parseExpression();
        if (this.peekTokenIs(SEMICOLON)) {
            this.nextToken();
        }
        return stmt;
    }

    private parseExpression(): AST.Expression | null {
        // Implement the logic to parse expressions
        // This is a placeholder implementation
        return null;
    }

    private parseSimpleExpression(): AST.Expression | null {
        let left = this.parseExpression();
        if (left == null) {
            return null;
        }
        if (this.peekTokenIs(GT) || this.peekTokenIs(LT) || this.peekTokenIs(EQ) || this.peekTokenIs(NOT_EQ) || this.peekTokenIs(GTE) || this.peekTokenIs(LTE)) {
            this.nextToken();
            const operator = this.curToken.literal;
            this.nextToken();
            const right = this.parseExpression();
            if (right == null) {
                return null;
            }
            return new AST.InfixExpression(this.curToken, left, operator, right);
        }
        return left;
    }

    private parseInfixExpression(left: AST.Expression): AST.Expression | null {
        const expression = new AST.InfixExpression(this.curToken, left, this.curToken.literal, null);
        this.nextToken();
        expression.right = this.parseExpression();
        return expression;
    }

    private parseCallExpression(functionExpr: AST.Expression): AST.Expression | null {
        const exp = new AST.CallExpression(this.curToken, functionExpr);
        if (!this.expectPeek(LPAREN)) {
            return null;
        }
        this.nextToken();
        exp.arguments = [];
        if (this.curTokenIs(RPAREN)) {
            this.nextToken();
            return exp;
        }
        exp.arguments.push(this.parseExpression());
        while (this.peekTokenIs(COMMA)) {
            this.nextToken();
            this.nextToken();
            exp.arguments.push(this.parseExpression());
        }
        if (!this.expectPeek(RPAREN)) {
            return null;
        }
        return exp;
    }

    private parseIndexExpression(left: AST.Expression): AST.Expression | null {
        const exp = new AST.IndexExpression(this.curToken, left, null);
        this.nextToken();
        exp.index = this.parseExpression();
        if (!this.expectPeek(RBRACE)) {
            return null;
        }
        return exp;
    }

    private parseIntegerLiteral(): AST.Expression | null {
        const lit = new AST.IntegerLiteral(this.curToken);
        const value = parseInt(this.curToken.literal, 10);
        if (isNaN(value)) {
            this.errors.push(`could not parse ${this.curToken.literal} as integer`);
            return null;
        }
        lit.value = value;
        return lit;
    }

    private parseStringLiteral(): AST.Expression {
        return new AST.StringLiteral(this.curToken, this.curToken.literal);
    }

    private parseIdentifier(): AST.Expression {
        return new AST.Identifier(this.curToken, this.curToken.literal);
    }

    private parseBoolean(): AST.Expression {
        return new AST.Boolean(this.curToken, this.curTokenIs(TRUE));
    }

    private parseArrayLiteral(): AST.Expression {
        const array = new AST.ArrayLiteral(this.curToken);
        array.elements = this.parseExpressionList(RBRACE);
        return array;
    }

    private parseExpressionList(end: TokenType): AST.Expression[] {
        const list: AST.Expression[] = [];
        if (this.peekTokenIs(end)) {
            this.nextToken();
            return list;
        }
        this.nextToken();
        list.push(this.parseExpression());
        while (this.peekTokenIs(COMMA)) {
            this.nextToken();
            this.nextToken();
            list.push(this.parseExpression());
        }
        if (!this.expectPeek(end)) {
            return [];
        }
        return list;
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

    public Errors(): string[] {
        return this.errors;
    }
}