import {Game} from './game';
import {GameBuilder} from "./GameBuilder";

export class GameRunner {
    public static main(game: Game): void {
        if (!game.isCoinGoalValid()) {
            game.getConsole().WriteLine("The coinGoal cannot be less than 6");
        } else {
            if(game.isNumberOfPlayerValid()) {
                let notAWinner;
                do {
                    game.roll(Math.floor(Math.random() * 6) + 1);

                    if (Math.floor(Math.random() * 4) == 1) {
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
}

GameRunner.main(new GameBuilder().withCoinGoal(20).build());

