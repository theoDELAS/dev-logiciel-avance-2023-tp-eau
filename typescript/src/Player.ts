    export class Player {
        private _name: string;
        private _joker: boolean;
        private _gold: number;
        private _joker_is_use_now: boolean;
        private _place: number
        private _streak: number;
        private _in_penalty_box: boolean

        constructor(name: string) {
            this._name = name;
            this._joker = true;
            this._joker_is_use_now = false;
            this._gold = 0;
            this._place = 0;
            this._streak = 1;
            this._in_penalty_box = false;
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


        get place(): number {
            return this._place;
        }

        set place(value: number) {
            this._place = value;
        }

        answeredGood(goal: number) {
           this._gold = (this._gold + this._streak) > goal ? goal : this._gold + this._streak
           this._streak++
        }

        answeredBad() {
            this._streak = 1
        }

        get in_penalty_box(): boolean {
            return this._in_penalty_box;
        }

        set in_penalty_box(value: boolean) {
            this._in_penalty_box = value;
        }
    }