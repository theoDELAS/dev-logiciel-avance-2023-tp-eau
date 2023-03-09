import {Game} from './game';
import {SystemConsole} from "./SystemConsole";
import {IConsole} from "./IConsole";

export class GameRunner {
    public static main( players: string[], console?: IConsole): void {
        const game = new Game(console ? console : new SystemConsole());
        for (const player of players) {
            game.add(player);
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
            game.getConsole().WriteLine("The game shouls contain 2 players minimum and 6 players maximum");
        }
    }
}

GameRunner.main(['Chet', 'Pat','Sue'], null);

