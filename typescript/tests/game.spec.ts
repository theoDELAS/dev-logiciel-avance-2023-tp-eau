import {GameRunner} from "../src/game-runner";
import {ConsoleSpy} from "./ConsoleSpy";

describe('The test environment', function() {
    it("should test one player stop game", function () {
        const console = new ConsoleSpy();
        GameRunner.main(['Jean-Pierre'], console);
        expect(console.Content).toContain("The game shouls contain 2 players minimum and 6 players maximum");
    });

    it("should test seven player stop game", function () {
        const console = new ConsoleSpy();
        GameRunner.main(['Jean-Pierre', 'Jean-Claude', 'Jean-Michel', 'Jean-Paul', 'Jean-Christophe', 'Jean-Baptiste', 'Jean-Philippe'], console);
        expect(console.Content).toContain("The game shouls contain 2 players minimum and 6 players maximum");
    });

    it("should test two player and play game", function () {
        const console = new ConsoleSpy();
        GameRunner.main(['Jean-Pierre', 'Jean-Claude'], console);
        expect(console.Content).toContain("now has 6 Gold Coins.");
    });

    it("should test six player and play game", function () {
        const console = new ConsoleSpy();
        GameRunner.main(['Jean-Pierre', 'Jean-Claude', 'Jean-Michel', 'Jean-Paul', 'Jean-Christophe', 'Jean-Baptiste'], console);
        expect(console.Content).toContain("now has 6 Gold Coins.");
    });
})
