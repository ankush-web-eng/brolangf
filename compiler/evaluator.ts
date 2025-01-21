// import { ExpressionStatement, Program, LetStatement, IfExpression, ForExpression, WhileExpression, BreakStatement, ContinueStatement, BlockStatement, IntegerLiteral, BooleanLiteral, StringLiteral, ArrayLiteral, IndexExpression, PrefixExpression, InfixExpression, CallExpression, Identifier, PrintStatement } from './ast';
// import { Object, Null, ReturnValue, ErrorObj, BreakControl, ContinueControl, Integer, BooleanObj, StringObj, ArrayObj, FunctionObj } from './object';
// import { Environment } from './environment';
// import { Node } from './ast';

// export function evalNode(node: Node, env: Environment): Object {
//     switch (node.constructor) {
//         case ExpressionStatement:
//             const expr = (node as ExpressionStatement).expression;
//             if (expr !== null) {
//                 return evalNode(expr, env);
//             } else {
//                 return new Null();
//             }

//         case Program:
//             return evalProgram(node as Program, env);

//         case LetStatement:
//             return evalLetStatement(node as LetStatement, env);

//         case IfExpression:
//             return evalIfExpression(node as IfExpression, env);

//         case ForExpression:
//             return evalForExpression(node as ForExpression, env);

//         case WhileExpression:
//             return evalWhileExpression(node as WhileExpression, env);

//         case BreakStatement:
//             return evalBreakStatement();

//         case ContinueStatement:
//             return evalContinueStatement();

//         case BlockStatement:
//             return evalBlockStatement(node as BlockStatement, env);

//         // case ReturnStatement:
//         //     return evalReturnStatement(node as ReturnStatement, env);

//         case IntegerLiteral:
//             return new Integer((node as IntegerLiteral).value);

//         case BooleanLiteral:
//             return new BooleanObj((node as BooleanLiteral).value);

//         case StringLiteral:
//             return new StringObj((node as StringLiteral).value);

//         case ArrayLiteral:
//             return evalArrayLiteral(node as ArrayLiteral, env);

//         case IndexExpression:
//             return evalIndexExpression(node as IndexExpression, env);

//         case PrefixExpression:
//             return evalPrefixExpression(node as PrefixExpression, env);

//         case InfixExpression:
//             return evalInfixExpression(node as InfixExpression, env);

//         case CallExpression:
//             return evalCallExpression(node as CallExpression, env);

//         case Identifier:
//             return evalIdentifier(node as Identifier, env);

//         case PrintStatement:
//             return evalPrintStatement(node as PrintStatement, env);

//         // case FunctionLiteral:
//         //     return evalFunctionLiteral(node as FunctionLiteral, env);

//         default:
//             return new Null();
//     }
// }

// function evalProgram(program: Program, env: Environment): Object {
//     let result: Object = new Null();

//     for (const statement of program.statements) {
//         result = evalNode(statement, env);

//         if (result instanceof ReturnValue) {
//             return result.value;
//         } else if (result instanceof ErrorObj) {
//             return result;
//         }
//     }

//     return result;
// }

// function evalLetStatement(stmt: LetStatement, env: Environment): Object {
//     const value = evalNode(stmt.value, env);
//     if (value instanceof ErrorObj) {
//         return value;
//     }

//     env.set(stmt.name.value, value);
//     return value;
// }

// function evalIfExpression(ie: IfExpression, env: Environment): Object {
//     const condition = evalNode(ie.condition, env);
//     if (isTruthy(condition)) {
//         return evalNode(ie.consequence, env);
//     } else if (ie.alternative) {
//         return evalNode(ie.alternative, env);
//     } else {
//         return new Null();
//     }
// }

// function evalForExpression(fe: ForExpression, env: Environment): Object {
//     const extendedEnv = Environment.newEnclosedEnvironment(env);
//     let result: Object = new Null();

//     for (evalNode(fe.init, extendedEnv); isTruthy(evalNode(fe.condition, extendedEnv)); evalNode(fe.update, extendedEnv)) {
//         result = evalNode(fe.body, extendedEnv);

//         if (result instanceof ReturnValue || result instanceof ErrorObj) {
//             return result;
//         } else if (result instanceof BreakControl) {
//             break;
//         } else if (result instanceof ContinueControl) {
//             continue;
//         }
//     }

//     return result;
// }

// function evalWhileExpression(we: WhileExpression, env: Environment): Object {
//     let result: Object = new Null();

//     while (isTruthy(evalNode(we.condition, env))) {
//         result = evalNode(we.body, env);

//         if (result instanceof ReturnValue || result instanceof ErrorObj) {
//             return result;
//         } else if (result instanceof BreakControl) {
//             break;
//         } else if (result instanceof ContinueControl) {
//             continue;
//         }
//     }

//     return result;
// }

// function evalBreakStatement(): Object {
//     return new BreakControl();
// }

// function evalContinueStatement(): Object {
//     return new ContinueControl();
// }

// function evalBlockStatement(block: BlockStatement, env: Environment): Object {
//     let result: Object = new Null();

//     for (const statement of block.statements) {
//         result = evalNode(statement, env);

//         if (result instanceof ReturnValue || result instanceof ErrorObj || result instanceof BreakControl || result instanceof ContinueControl) {
//             return result;
//         }
//     }

//     return result;
// }

// // function evalReturnStatement(rs: ReturnStatement, env: Environment): Object {
// //     const value = evalNode(rs.returnValue, env);
// //     if (value instanceof ErrorObj) {
// //         return value;
// //     }
// //     return new ReturnValue(value);
// // }

// function evalArrayLiteral(al: ArrayLiteral, env: Environment): Object {
//     const elements = al.elements.map(element => evalNode(element, env));
//     return new ArrayObj(elements);
// }

// function evalIndexExpression(ie: IndexExpression, env: Environment): Object {
//     const left = evalNode(ie.left, env);
//     const index = evalNode(ie.index, env);

//     if (left instanceof ArrayObj && index instanceof Integer) {
//         return left.elements[index.value] || new Null();
//     }

//     return new ErrorObj(`index operator not supported: ${left.type()}`);
// }

// function evalPrefixExpression(pe: PrefixExpression, env: Environment): Object {
//     const right = evalNode(pe.right, env);

//     switch (pe.operator) {
//         case '!':
//             return evalBangOperatorExpression(right);
//         case '-':
//             return evalMinusPrefixOperatorExpression(right);
//         default:
//             return new ErrorObj(`unknown operator: ${pe.operator}${right.type()}`);
//     }
// }

// function evalBangOperatorExpression(right: Object): Object {
//     if (right instanceof BooleanObj) {
//         return new BooleanObj(!right.value);
//     } else if (right instanceof Null) {
//         return new BooleanObj(true);
//     } else {
//         return new BooleanObj(false);
//     }
// }

// function evalMinusPrefixOperatorExpression(right: Object): Object {
//     if (right instanceof Integer) {
//         return new Integer(-right.value);
//     } else {
//         return new ErrorObj(`unknown operator: -${right.type()}`);
//     }
// }

// function evalInfixExpression(ie: InfixExpression, env: Environment): Object {
//     const left = evalNode(ie.left, env);
//     const right = evalNode(ie.right, env);

//     switch (ie.operator) {
//         case '+':
//             return evalPlusInfixExpression(left, right);
//         case '-':
//             return evalMinusInfixExpression(left, right);
//         case '*':
//             return evalMultiplyInfixExpression(left, right);
//         case '/':
//             return evalDivideInfixExpression(left, right);
//         case '==':
//             return new BooleanObj(left === right);
//         case '!=':
//             return new BooleanObj(left !== right);
//         case '<':
//             return evalLessThanInfixExpression(left, right);
//         case '>':
//             return evalGreaterThanInfixExpression(left, right);
//         default:
//             return new ErrorObj(`unknown operator: ${left.type()} ${ie.operator} ${right.type()}`);
//     }
// }

// function evalPlusInfixExpression(left: Object, right: Object): Object {
//     if (left instanceof Integer && right instanceof Integer) {
//         return new Integer(left.value + right.value);
//     } else if (left instanceof StringObj && right instanceof StringObj) {
//         return new StringObj(left.value + right.value);
//     } else {
//         return new ErrorObj(`type mismatch: ${left.type()} + ${right.type()}`);
//     }
// }

// function evalMinusInfixExpression(left: Object, right: Object): Object {
//     if (left instanceof Integer && right instanceof Integer) {
//         return new Integer(left.value - right.value);
//     } else {
//         return new ErrorObj(`type mismatch: ${left.type()} - ${right.type()}`);
//     }
// }

// function evalMultiplyInfixExpression(left: Object, right: Object): Object {
//     if (left instanceof Integer && right instanceof Integer) {
//         return new Integer(left.value * right.value);
//     } else {
//         return new ErrorObj(`type mismatch: ${left.type()} * ${right.type()}`);
//     }
// }

// function evalDivideInfixExpression(left: Object, right: Object): Object {
//     if (left instanceof Integer && right instanceof Integer) {
//         return new Integer(left.value / right.value);
//     } else {
//         return new ErrorObj(`type mismatch: ${left.type()} / ${right.type()}`);
//     }
// }

// function evalLessThanInfixExpression(left: Object, right: Object): Object {
//     if (left instanceof Integer && right instanceof Integer) {
//         return new BooleanObj(left.value < right.value);
//     } else {
//         return new ErrorObj(`type mismatch: ${left.type()} < ${right.type()}`);
//     }
// }

// function evalGreaterThanInfixExpression(left: Object, right: Object): Object {
//     if (left instanceof Integer && right instanceof Integer) {
//         return new BooleanObj(left.value > right.value);
//     } else {
//         return new ErrorObj(`type mismatch: ${left.type()} > ${right.type()}`);
//     }
// }

// function evalCallExpression(ce: CallExpression, env: Environment): Object {
//     const func = evalNode(ce.function, env);
//     const args = ce.arguments.map(arg => evalNode(arg, env));

//     if (func instanceof FunctionObj) {
//         const extendedEnv = extendFunctionEnv(func, args);
//         const evaluated = evalNode(func.body, extendedEnv);
//         return unwrapReturnValue(evaluated);
//     } else {
//         return new ErrorObj(`not a function: ${func.type()}`);
//     }
// }

// // function evalFunctionLiteral(fl: FunctionLiteral, env: Environment): Object {
// //     const params = fl.parameters;
// //     const body = fl.body;
// //     return new FunctionObj(params, body, env);
// // }

// function evalIdentifier(node: Identifier, env: Environment): Object {
//     const [value, ok] = env.get(node.value);
//     if (ok) {
//         return value!;
//     } else {
//         return new ErrorObj(`identifier not found: ${node.value}`);
//     }
// }

// function evalPrintStatement(stmt: PrintStatement, env: Environment): Object {
//     if (!stmt.expression) {
//         console.log(); // Print empty line if no expression
//         return new Null();
//     }

//     const result = evalNode(stmt.expression, env);
//     if (result instanceof ErrorObj) {
//         return result;
//     }

//     // Handle different types of values to print
//     if (result instanceof Integer) {
//         console.log(result.value);
//     } else if (result instanceof StringObj) {
//         console.log(result.value);
//     } else if (result instanceof BooleanObj) {
//         console.log(result.value ? 'sach' : 'jhuth');
//     } else if (result instanceof ArrayObj) {
//         console.log('[' + result.elements.map(e => e.inspect()).join(', ') + ']');
//     } else if (result instanceof Null) {
//         console.log("Hn beta, jis keyboard se ladkiyo k DMs m milta h tu, typing na hori hogi tere se isi keyboard se!!");
//     } else {
//         console.log(result.inspect());
//     }

//     return new Null();
// }

// function isTruthy(obj: Object): boolean {
//     if (obj instanceof Null) {
//         return false;
//     } else if (obj instanceof BooleanObj) {
//         return obj.value;
//     } else {
//         return true;
//     }
// }

// function extendFunctionEnv(func: FunctionObj, args: Object[]): Environment {
//     const env = Environment.newEnclosedEnvironment(func.env);

//     for (let i = 0; i < func.parameters.length; i++) {
//         env.set(func.parameters[i].value, args[i]);
//     }

//     return env;
// }

// function unwrapReturnValue(obj: Object): Object {
//     if (obj instanceof ReturnValue) {
//         return obj.value;
//     }
//     return obj;
// }