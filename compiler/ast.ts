import { Token } from './token';

export interface Node {
    tokenLiteral(): string;
    toString(): string;
}

export interface Statement extends Node {
    statementNode(): void;
}

export interface Expression extends Node {
    expressionNode(): void;
}

export class Program implements Node {
    statements: Statement[];

    constructor() {
        this.statements = [];
    }

    tokenLiteral(): string {
        if (this.statements.length > 0) {
            return this.statements[0].tokenLiteral();
        }
        return '';
    }

    toString(): string {
        return this.statements.map(stmt => stmt.toString()).join('');
    }
}

export class CallExpression implements Expression {
    token: Token;
    function: Expression;
    arguments: Expression[];

    constructor(token: Token, func: Expression, args: Expression[]) {
        this.token = token;
        this.function = func;
        this.arguments = args;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return "CallExpression";
    }
}

export class AssignStatement implements Statement {
    token: Token;
    name: Identifier;
    value: Expression;

    constructor(token: Token, name: Identifier, value: Expression) {
        this.token = token;
        this.name = name;
        this.value = value;
    }

    statementNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return `${this.name.toString()} = ${this.value.toString()};`;
    }
}

export class PrintStatement implements Statement {
    token: Token;
    expression: Expression;

    constructor(token: Token, expression: Expression) {
        this.token = token;
        this.expression = expression;
    }

    statementNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        if (this.expression != null) {
            return `bol_bhai(${this.expression.toString()})`;
        }
        return 'bol_bhai()';
    }
}

export class LetStatement implements Statement {
    token: Token;
    name: Identifier;
    value: Expression;

    constructor(token: Token, name: Identifier, value: Expression) {
        this.token = token;
        this.name = name;
        this.value = value;
    }

    statementNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return `bhai_sun ${this.name.toString()} = ${this.value.toString()};`;
    }
}

export class Identifier implements Expression {
    token: Token;
    value: string;

    constructor(token: Token, value: string) {
        this.token = token;
        this.value = value;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return this.value;
    }
}

export class IntegerLiteral implements Expression {
    token: Token;
    value: number;

    constructor(token: Token, value: number) {
        this.token = token;
        this.value = value;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return this.value.toString();
    }
}

export class StringLiteral implements Expression {
    token: Token;
    value: string;

    constructor(token: Token, value: string) {
        this.token = token;
        this.value = value;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return this.value;
    }
}

export class BooleanLiteral implements Expression {
    token: Token;
    value: boolean;

    constructor(token: Token, value: boolean) {
        this.token = token;
        this.value = value;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return this.value.toString();
    }
}

export class ArrayLiteral implements Expression {
    token: Token;
    elements: Expression[];

    constructor(token: Token, elements: Expression[]) {
        this.token = token;
        this.elements = elements;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return `[${this.elements.map(e => e.toString()).join(", ")}]`;
    }
}

export class IndexExpression implements Expression {
    token: Token;
    left: Expression;
    index: Expression;

    constructor(token: Token, left: Expression, index: Expression) {
        this.token = token;
        this.left = left;
        this.index = index;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return `${this.left.toString()}[${this.index.toString()}]`;
    }
}

export class ExpressionStatement implements Statement {
    token: Token;
    expression: Expression | null;

    constructor(token: Token, expression: Expression | null = null) {
        this.token = token;
        this.expression = expression;
    }

    statementNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        if (this.expression != null) {
            return this.expression.toString();
        }
        return '';
    }
}

export class PrefixExpression implements Expression {
    token: Token;
    operator: string;
    right: Expression;

    constructor(token: Token, operator: string, right: Expression) {
        this.token = token;
        this.operator = operator;
        this.right = right;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return `(${this.operator}${this.right.toString()})`;
    }
}

export class InfixExpression implements Expression {
    token: Token;
    left: Expression;
    operator: string;
    right: Expression;

    constructor(token: Token, left: Expression, operator: string, right: Expression) {
        this.token = token;
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return `(${this.left.toString()} ${this.operator} ${this.right.toString()})`;
    }
}

export class BlockStatement implements Statement {
    token: Token;
    statements: Statement[];

    constructor(token: Token, statements: Statement[]) {
        this.token = token;
        this.statements = statements;
    }

    statementNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return this.statements.map(stmt => stmt.toString()).join('');
    }
}

export class IfExpression implements Expression {
    token: Token;
    condition: Expression;
    consequence: BlockStatement;
    elseIf: IfExpression[];
    alternative: BlockStatement | null;

    constructor(token: Token, condition: Expression, consequence: BlockStatement, elseIf: IfExpression[], alternative: BlockStatement | null) {
        this.token = token;
        this.condition = condition;
        this.consequence = consequence;
        this.elseIf = elseIf;
        this.alternative = alternative;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        let out = `if ${this.condition.toString()} ${this.consequence.toString()}`;
        if (this.elseIf.length > 0) {
            out += ` else if ${this.elseIf.map(e => e.toString()).join(' else if ')}`;
        }
        if (this.alternative) {
            out += ` else ${this.alternative.toString()}`;
        }
        return out;
    }
}

export class WhileExpression implements Expression {
    token: Token;
    condition: Expression;
    body: BlockStatement;

    constructor(token: Token, condition: Expression, body: BlockStatement) {
        this.token = token;
        this.condition = condition;
        this.body = body;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return `while ${this.condition.toString()} ${this.body.toString()}`;
    }
}

export class ForExpression implements Expression {
    token: Token;
    init: Statement;
    condition: Expression;
    update: Statement;
    body: BlockStatement;

    constructor(token: Token, init: Statement, condition: Expression, update: Statement, body: BlockStatement) {
        this.token = token;
        this.init = init;
        this.condition = condition;
        this.update = update;
        this.body = body;
    }

    expressionNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return `for ${this.init.toString()}; ${this.condition.toString()}; ${this.update.toString()} ${this.body.toString()}`;
    }
}

export class BreakStatement implements Statement {
    token: Token;

    constructor(token: Token) {
        this.token = token;
    }

    statementNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return "break;";
    }
}

export class ContinueStatement implements Statement {
    token: Token;

    constructor(token: Token) {
        this.token = token;
    }

    statementNode(): void { }

    tokenLiteral(): string {
        return this.token.literal;
    }

    toString(): string {
        return "continue;";
    }
}