import {IConsole} from "./IConsole";
import {Player} from "./Player";

export class Game {

    private players: Array<Player> = [];
    private places: Array<number> = [];
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];
    private _console: IConsole;

    constructor(console: IConsole) {
        this._console = console;
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push(this.createRockQuestion(i));
        }
    }

    private createRockQuestion(index: number): string {
        return "Rock Question " + index;
    }

    public getConsole() {
        return this._console;
    }

    public add(name: string): boolean {
        this.players.push(new Player(name));
        this.places[this.howManyPlayers()] = 0;
        this.purses[this.howManyPlayers()] = 0;
        this.inPenaltyBox[this.howManyPlayers()] = false;

        this._console.WriteLine(name + " was added");
        this._console.WriteLine("They are player number " + this.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public isNumberOfPlayerValid() {
        return this.howManyPlayers() >= 2 && this.howManyPlayers() <= 6;
    }

    public roll(roll: number) {
        this._console.WriteLine(this.players[this.currentPlayer].name + " is the current player")
        this._console.WriteLine("They have rolled a " + roll)

        if (this.inPenaltyBox[this.currentPlayer]) {
            if (roll % 2 != 0) {
                this.inPenaltyBox[this.currentPlayer]  = false;

                this._console.WriteLine(this.players[this.currentPlayer].name + " is getting out of the penalty box");
                this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
                if (this.places[this.currentPlayer] > 11) {
                    this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
                }

                this._console.WriteLine(this.players[this.currentPlayer].name + "'s new location is " + this.places[this.currentPlayer]);
                this._console.WriteLine("The category is " + this.currentCategory());
                if (!this.useJoker(this.players[this.currentPlayer])) {
                    this.askQuestion();
                } else {
                    this._console.WriteLine(this.players[this.currentPlayer].name + ' uses a joker');
                    this._console.WriteLine(this.players[this.currentPlayer].name + ' doesn\'t earn gold this turn');
                }
            } else {
                this._console.WriteLine(this.players[this.currentPlayer].name + " is not getting out of the penalty box");

            }
        } else {

            this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
            if (this.places[this.currentPlayer] > 11) {
                this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
            }

            this._console.WriteLine(this.players[this.currentPlayer].name + "'s new location is " + this.places[this.currentPlayer]);
            this._console.WriteLine("The category is " + this.currentCategory());
            if (!this.useJoker(this.players[this.currentPlayer])) {
                this.askQuestion();
            } else {
                this._console.WriteLine(this.players[this.currentPlayer].name + ' uses a joker');
                this._console.WriteLine(this.players[this.currentPlayer].name + ' doesn\'t earn gold this turn');
            }
        }
    }

    private askQuestion(): void {
        if (this.currentCategory() == 'Pop')
            this._console.WriteLine(this.popQuestions.shift());
        if (this.currentCategory() == 'Science')
            this._console.WriteLine(this.scienceQuestions.shift());
        if (this.currentCategory() == 'Sports')
            this._console.WriteLine(this.sportsQuestions.shift());
        if (this.currentCategory() == 'Rock')
            this._console.WriteLine(this.rockQuestions.shift());
    }

    private currentCategory(): string {
        if (this.places[this.currentPlayer] == 0)
            return 'Pop';
        if (this.places[this.currentPlayer] == 4)
            return 'Pop';
        if (this.places[this.currentPlayer] == 8)
            return 'Pop';
        if (this.places[this.currentPlayer] == 1)
            return 'Science';
        if (this.places[this.currentPlayer] == 5)
            return 'Science';
        if (this.places[this.currentPlayer] == 9)
            return 'Science';
        if (this.places[this.currentPlayer] == 2)
            return 'Sports';
        if (this.places[this.currentPlayer] == 6)
            return 'Sports';
        if (this.places[this.currentPlayer] == 10)
            return 'Sports';
        return 'Rock';
    }

    private didPlayerWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        if (!this.players[this.currentPlayer].joker_is_use_now) {
            this._console.WriteLine('Question was incorrectly answered');
            this._console.WriteLine(this.players[this.currentPlayer].name + " was sent to the penalty box");
            this.inPenaltyBox[this.currentPlayer] = true;
        } else {
            this.players[this.currentPlayer].joker_is_use_now = false;
        }

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (!this.players[this.currentPlayer].joker_is_use_now) {
            if (this.inPenaltyBox[this.currentPlayer]) {
                if (this.isGettingOutOfPenaltyBox) {
                    this._console.WriteLine('Answer was correct!!!!');
                    this.purses[this.currentPlayer] += 1;
                    this._console.WriteLine(this.players[this.currentPlayer].name + " now has " +
                        this.purses[this.currentPlayer] + " Gold Coins.");

                    let winner = this.didPlayerWin();
                    this.currentPlayer += 1;
                    if (this.currentPlayer == this.players.length)
                        this.currentPlayer = 0;

                    return winner;
                } else {
                    this.currentPlayer += 1;
                    if (this.currentPlayer == this.players.length)
                        this.currentPlayer = 0;
                    return true;
                }
            } else {
                this._console.WriteLine("Answer was corrent!!!!");

                this.purses[this.currentPlayer] += 1;
                this._console.WriteLine(this.players[this.currentPlayer].name + " now has " +
                    this.purses[this.currentPlayer] + " Gold Coins.");

                let winner = this.didPlayerWin();

                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length)
                    this.currentPlayer = 0;

                return winner;
            }
        } else {
            this.players[this.currentPlayer].joker_is_use_now = false;
            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
            return true;
        }
    }

    private useJoker(player: Player) {
        if (player.joker) {
            const randomRoll = Math.floor(Math.random() * 2);
            this._console.WriteLine(randomRoll.toString());
            if (randomRoll === 1) {
                player.joker = false;
                player.joker_is_use_now = true
                return true;
            }
        }
        return false;
    }
}
