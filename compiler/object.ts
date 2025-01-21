// import { Identifier, BlockStatement } from "./ast";
// import { Environment } from "./environment";

// export type ObjectType = string;

// export const INTEGER_OBJ: ObjectType = "INTEGER";
// export const STRING_OBJ: ObjectType = "STRING";
// export const BOOLEAN_OBJ: ObjectType = "BOOLEAN";
// export const NULL_OBJ: ObjectType = "NULL";
// export const ERROR_OBJ: ObjectType = "ERROR";
// export const ARRAY_OBJ: ObjectType = "ARRAY";
// export const FUNCTION_OBJ: ObjectType = "FUNCTION";
// export const RETURN_VALUE_OBJ: ObjectType = "RETURN_VALUE";

// export interface Object {
//     type(): ObjectType;
//     inspect(): string;
// }

// export interface Hashable {
//     hashKey(): HashKey;
// }

// export class HashKey {
//     constructor(public type: ObjectType, public value: number) {}
// }

// export class Integer implements Object, Hashable {
//     constructor(public value: number) {}

//     type(): ObjectType {
//         return INTEGER_OBJ;
//     }

//     inspect(): string {
//         return this.value.toString();
//     }

//     hashKey(): HashKey {
//         const hash = fnv1a(this.value.toString());
//         return new HashKey(this.type(), hash);
//     }
// }

// export class StringObj implements Object, Hashable {
//     constructor(public value: string) {}

//     type(): ObjectType {
//         return STRING_OBJ;
//     }

//     inspect(): string {
//         return this.value;
//     }

//     hashKey(): HashKey {
//         const hash = fnv1a(this.value);
//         return new HashKey(this.type(), hash);
//     }
// }

// export class BooleanObj implements Object, Hashable {
//     constructor(public value: boolean) {}

//     type(): ObjectType {
//         return BOOLEAN_OBJ;
//     }

//     inspect(): string {
//         return this.value.toString();
//     }

//     hashKey(): HashKey {
//         const value = this.value ? 1 : 0;
//         return new HashKey(this.type(), value);
//     }
// }

// export class BreakControl implements Object {
//     type(): ObjectType {
//         return "BREAK";
//     }

//     inspect(): string {
//         return "break";
//     }
// }

// export class ContinueControl implements Object {
//     type(): ObjectType {
//         return "CONTINUE";
//     }

//     inspect(): string {
//         return "continue";
//     }
// }

// export class Null implements Object {
//     type(): ObjectType {
//         return NULL_OBJ;
//     }

//     inspect(): string {
//         return "Hn beta, jis keyboard se ladkiyo k DMs m milta h tu, typing na hori hogi tere se isi keyboard se!!";
//     }
// }

// export class ReturnValue implements Object {
//     constructor(public value: Object) {}

//     type(): ObjectType {
//         return RETURN_VALUE_OBJ;
//     }

//     inspect(): string {
//         return this.value.inspect();
//     }
// }

// export class ErrorObj implements Object {
//     constructor(public message: string) {}

//     type(): ObjectType {
//         return ERROR_OBJ;
//     }

//     inspect(): string {
//         return "Are Bhai Bhai Bhai!! " + this.message;
//     }
// }

// export class ArrayObj implements Object {
//     constructor(public elements: Object[]) {}

//     type(): ObjectType {
//         return ARRAY_OBJ;
//     }

//     inspect(): string {
//         const elements = this.elements.map(e => e.inspect()).join(", ");
//         return `[${elements}]`;
//     }
// }

// export class FunctionObj implements Object {
//     constructor(
//         public parameters: Identifier[],
//         public body: BlockStatement,
//         public env: Environment
//     ) {}

//     type(): ObjectType {
//         return FUNCTION_OBJ;
//     }

//     inspect(): string {
//         const params = this.parameters.map(p => p.toString()).join(", ");
//         return `fn(${params}) ${this.body.toString()}`;
//     }
// }

// function fnv1a(str: string): number {
//     let hash = 2166136261;
//     for (let i = 0; i < str.length; i++) {
//         hash ^= str.charCodeAt(i);
//         hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
//     }
//     return hash >>> 0;
// }