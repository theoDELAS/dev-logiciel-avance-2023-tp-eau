import {IConsole} from "./IConsole";
import {Player} from "./Player";

export class Game {

    private players: Array<Player> = [];
    private places: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockOrTechnoQuestions: Array<string> = [];
    private _console: IConsole;
    private coinGoal: number;

    constructor(console: IConsole, players: Array<Player>, coinGoal: number, techno: boolean) {
        this._console = console;
        for (const player of players) {
            this.add(player)
        }
        this.coinGoal = coinGoal;
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockOrTechnoQuestions.push(this.createRockOrTechnoQuestion(i, techno));
        }
    }

    private createRockOrTechnoQuestion(index: number, techno: boolean): string {
        return(techno ?  " Techno Question" : "Rock Question ") + index ;
    }

    public getConsole() {
        return this._console;
    }

    public isCoinGoalValid() {
        return this.coinGoal > 5;
    }

    public add(player: Player): boolean {
        this.players.push(player);
        player.place = 0
        this.inPenaltyBox[this.howManyPlayers()] = false;

        this._console.WriteLine(player.name + " was added");
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
        this._console.WriteLine("          ")
        this._console.WriteLine(this.players[this.currentPlayer].name + " is the current player")
        this._console.WriteLine('Current player => ' + this.howManyPlayers())
        this._console.WriteLine("They have rolled a " + roll)

        if (this.inPenaltyBox[this.currentPlayer]) {
            if (roll % 2 != 0) {
                this.inPenaltyBox[this.currentPlayer]  = false;

                this._console.WriteLine(this.players[this.currentPlayer].name + " is getting out of the penalty box");
                this.players[this.currentPlayer].place = this.players[this.currentPlayer].place + roll;
                if (this.players[this.currentPlayer].place > 11) {
                    this.players[this.currentPlayer].place = this.players[this.currentPlayer].place - 12;
                }

                this._console.WriteLine(this.players[this.currentPlayer].name + "'s new location is " + this.players[this.currentPlayer].place);
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

            this.players[this.currentPlayer].place = this.players[this.currentPlayer].place + roll;
            if (this.players[this.currentPlayer].place > 11) {
                this.players[this.currentPlayer].place = this.players[this.currentPlayer].place - 12;
            }

            this._console.WriteLine(this.players[this.currentPlayer].name + "'s new location is " + this.players[this.currentPlayer].place);
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
            this._console.WriteLine(this.rockOrTechnoQuestions.shift());
    }

    private currentCategory(): string {
        if (this.players[this.currentPlayer].place == 0)
            return 'Pop';
        if (this.players[this.currentPlayer].place == 4)
            return 'Pop';
        if (this.players[this.currentPlayer].place == 8)
            return 'Pop';
        if (this.players[this.currentPlayer].place == 1)
            return 'Science';
        if (this.players[this.currentPlayer].place == 5)
            return 'Science';
        if (this.players[this.currentPlayer].place == 9)
            return 'Science';
        if (this.players[this.currentPlayer].place == 2)
            return 'Sports';
        if (this.players[this.currentPlayer].place == 6)
            return 'Sports';
        if (this.players[this.currentPlayer].place == 10)
            return 'Sports';
        return 'Rock';
    }

    private didPlayerWin(): boolean {
        return !(this.players[this.currentPlayer].gold == this.coinGoal)
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
                    this.players[this.currentPlayer].gold += 1;
                    this._console.WriteLine(this.players[this.currentPlayer].name + " now has " +
                        this.players[this.currentPlayer].gold + " Gold Coins.");

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

                this.players[this.currentPlayer].gold += 1;
                this._console.WriteLine(this.players[this.currentPlayer].name + " now has " +
                    this.players[this.currentPlayer].gold + " Gold Coins.");

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

    public useJoker(player: Player) {
        if (player.joker) {
            const randomRoll = Math.floor(Math.random() * 6);
            if (randomRoll === 1) {
                player.joker = false;
                player.joker_is_use_now = true
                return true;
            }
        }
        return false;
    }
}
