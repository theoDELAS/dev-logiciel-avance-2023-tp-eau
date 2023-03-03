import {describe, it} from "mocha";
import sinon from 'sinon';
import {ConsoleSpy} from "./ConsoleSpy";
import {Game} from "../src/game";
import * as fs from "fs";

const goldenMasterDir = "/Users/theodelas/ynov/dev_logi_avancee/dev-logiciel-avance-2023-tp-eau/typescript/tests/golden-master"
describe("Golden Master", () => {
    it("should record empty game", function () {
        const spyConsole = new ConsoleSpy();
        const game = new Game(spyConsole);

        const recordedContent = spyConsole.Content;
        fs.writeFileSync(`${goldenMasterDir}/record.txt`, recordedContent);
    });

    it('should play game without player', function () {

    });

    function playAGame(game: Game, randomSeed: number, ...players: string[]): void {
        for (const player of players) {
            game.add(player);
        const rand = Math.floor(Math.random() * 1000) + 1;
        let notAWinner: boolean;
        do {
            game.roll(Math.random() % 5 + 1);
            if (rand.Next(9) == 7) {
                notAWinner = game.wrongAnswer();
            } else {
                notAWinner = game.wasCorrectlyAnswered();
            }
        } while (notAWinner);
    }

    function createFileName(randomSeed: number, players: string[]) {
        const fileName = `record-${randomSeed}-${players.join("-")}.txt`;
        return `${goldenMasterDir}/${fileName}`;
    }


})