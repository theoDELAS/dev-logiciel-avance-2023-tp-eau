export class Player {
    private _name: string;
    private _joker: boolean;
    private _gold: number;
    private _joker_is_use_now: boolean;
    private _streak: number;
    constructor(name: string) {
        this._name = name;
        this._joker = true;
        this._joker_is_use_now = false;
        this._gold = 0;
        this._streak = 1;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get joker(): boolean {
        return this._joker;
    }

    set joker(value: boolean) {
        this._joker = value;
    }

    get gold(): number {
        return this._gold;
    }


    get joker_is_use_now(): boolean {
        return this._joker_is_use_now;
    }

    set joker_is_use_now(value: boolean) {
        this._joker_is_use_now = value;
    }

    answeredGood(goal: number) {
       this._gold = (this._gold + this._streak) > goal ? goal : this._gold + this._streak
       this._streak++
    }

    answeredBad() {
        this._streak = 1
    }
}
