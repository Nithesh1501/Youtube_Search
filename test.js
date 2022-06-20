const ONE =  1;
const TWO =  2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;

const FIVEHUNDREDWIDTH = 500;
const NINEHUNDREDWIDTH = 900;
const TWELVEHUNDREDWIDTH = 1200;
const FIFTEENHUNDREDWIDTH = 1500;
const SIXTEENHUNDREDWIDTH = 1600;


function videoCount(divWidth) {
    let videoCount;
    if (divWidth < FIVEHUNDREDWIDTH) {
        videoCount = ONE;
    } else if (divWidth < NINEHUNDREDWIDTH) {
        videoCount = TWO;
    } else if (divWidth < TWELVEHUNDREDWIDTH) {
        videoCount = THREE;
    } else if (divWidth < FIFTEENHUNDREDWIDTH) {
        videoCount = FOUR;
    } else {
        videoCount = FIVE;
    }
    return videoCount;
}

describe("Case", function () {
    it("Succesfully returned video count", function () {
        expect(videoCount(TWELVEHUNDREDWIDTH)).toBe(FOUR);
        expect(videoCount(FIVEHUNDREDWIDTH)).toBe(TWO);
        expect(videoCount(SIXTEENHUNDREDWIDTH)).toBe(FIVE);
    });
}); 
