import { Object } from './object';

export class Environment {
    private store: Map<string, Object>;
    public outer: Environment | null;
    public outputBuilder: StringBuilder;

    constructor() {
        this.store = new Map<string, Object>();
        this.outer = null;
        this.outputBuilder = new StringBuilder();
    }

    static newEnvironment(): Environment {
        return new Environment();
    }

    static newEnclosedEnvironment(outer: Environment): Environment {
        const env = Environment.newEnvironment();
        env.outer = outer;
        return env;
    }

    get(name: string): [Object | null, boolean] {
        const obj = this.store.get(name);
        if (!obj && this.outer) {
            console.log(`Variable not found: ${name}`);
            return this.outer.get(name);
        }
        return [obj || null, !!obj];
    }

    set(name: string, val: Object): Object {
        console.log(`Setting variable: ${name} = ${val.inspect()}`);
        this.store.set(name, val);
        return val;
    }

    extend(): Environment {
        return new Environment();
    }
}

class StringBuilder {
    private _stringArray: string[] = [];

    append(str: string) {
        this._stringArray.push(str);
    }

    toString() {
        return this._stringArray.join('');
    }
}