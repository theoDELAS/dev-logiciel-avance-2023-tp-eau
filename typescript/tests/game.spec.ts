import {GameRunner} from "../src/game-runner";
import {ConsoleSpy} from "./ConsoleSpy";
import {Player} from "../src/Player";
import {GameBuilder} from "../src/GameBuilder";

describe('The test environment', function() {
    it("should test one player stop game", function () {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withPlayers([new Player('Jean-Pierre')]).withCustomConsole(console).build());
        expect(console.Content).toContain("The game should contain 2 players minimum and 6 players maximum");
    });

    it("should test seven player stop game", function () {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withPlayers([new Player('Jean-Pierre'), new Player('Jean-Claude'), new Player('Jean-Michel'), new Player('Jean-Paul'), new Player('Jean-Christophe'), new Player('Jean-Baptiste'), new Player('Jean-Philippe')]).withCustomConsole(console).build());
        expect(console.Content).toContain("The game should contain 2 players minimum and 6 players maximum");
    });

    it("should test two player and play game", function () {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withPlayers([new Player('Jean-Pierre'), new Player('Jean-Claude')]).withCustomConsole(console).build());
        expect(console.Content).toContain("now has 6 Gold Coins.");
    });

    it("should test six player and play game", function () {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withPlayers([new Player('Jean-Pierre'), new Player('Jean-Claude'), new Player('Jean-Michel'), new Player('Jean-Paul'), new Player('Jean-Christophe'), new Player('Jean-Baptiste')]).withCustomConsole(console).build());
        expect(console.Content).toContain("now has 6 Gold Coins.");
    });

    it("should not run a game when four coin goal", function () {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withCoinGoal(4).withCustomConsole(console).build());
        expect(console.Content).toContain("The coinGoal cannot be less than 6");
    });

    it("should run a game when eight coin goal", function () {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withCoinGoal(8).withCustomConsole(console).build());
        expect(console.Content).toContain("now has 8 Gold Coins.");
    });

    it("should test techno question", function () {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withTechnoQuestions().withCustomConsole(console).build());
        expect(console.Content).toContain("Techno Question");
    });
    it("should test rock question by default", function () {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withCustomConsole(console).build());
        expect(console.Content).toContain("Rock Question");
    });
    it("should test streak", function () {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.5;
        global.Math = mockMath;
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withCustomConsole(console).build());
        expect(console.Content).toContain("Suuuuuuue now has 1 Gold Coins.");
        expect(console.Content).toContain("Suuuuuuue now has 3 Gold Coins.");
        expect(console.Content).not.toContain("Suuuuuuue now has 2 Gold Coins.");
    });
})

describe('test penalty box', function () {
    it("should escape from prison", function() {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withCoinGoal(20).withCustomConsole(console).build());
        expect(console.Content).toContain("is getting out of the penalty box");
    })
});

describe('Test joker', function () {
    it("should not earn a gold when player uses a joker", function() {
        const console = new ConsoleSpy();
        GameRunner.main(new GameBuilder().withCoinGoal(20).withCustomConsole(console).build());
        expect(console.Content).toContain("uses a joker");
        expect(console.Content).toContain("doesn't earn gold this turn");
    })
});
