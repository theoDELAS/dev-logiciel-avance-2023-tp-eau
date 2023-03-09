import {Game} from './game';
import {SystemConsole} from "./SystemConsole";
import {IConsole} from "./IConsole";
import {Player} from "./Player";

export class GameRunner {
    public static main( players: Player[], console?: IConsole, coinGoal?: number): void {
        const game = new Game(console ? console : new SystemConsole(), coinGoal ? coinGoal : 6);
        for (const player of players) {
            game.add(player.name);
        }

        if(game.isNumberOfPlayerValid()) {
            let notAWinner;
            do {
                game.roll(Math.floor(Math.random() * 6) + 1);

                if (Math.floor(Math.random() * 10) == 7) {
                    notAWinner = game.wrongAnswer();
                } else {
                    notAWinner = game.wasCorrectlyAnswered();
                }
            } while (notAWinner);
        } else {
            game.getConsole().WriteLine("The game should contain 2 players minimum and 6 players maximum");
        }
    }
}

const player1 = new Player('Chet');
const player2 = new Player('Pat');
const player3 = new Player('Sue');
GameRunner.main([player1, player2, player3], null, null);

