import {Game} from './game';
import {SystemConsole} from "./SystemConsole";
import {Player} from "./Player";

export class GameRunner {
    public static main(): void {
        const game = new Game(new SystemConsole());
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

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

GameRunner.main();

  