import {GameRunner} from "../src/game-runner";

describe('The test environment', function() {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should access game", function () {
        expect(GameRunner).toBeDefined()
    });
})
