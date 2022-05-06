
function videoCount(divWidth) {
    let videoCount;
    if (divWidth < 500) {
        videoCount = 1;
    } else if (divWidth < 900) {
        videoCount = 2;
    } else if (divWidth < 1200) {
        videoCount = 3;
    } else if (divWidth < 1500) {
        videoCount = 4;
    } else {
        videoCount = 5;
    }

    return videoCount;
}

describe("Case", function () {
    it("Succesfully returned video count", function () {
        expect(videoCount(1200)).toBe(4);
        expect(videoCount(600)).toBe(2);
        expect(videoCount(450)).toBe(1);
        expect(videoCount(1600)).toBe(5);
    });
});

/* describe("Case Failed!", function () {
    it("Video Count cannot be returned due to an error ", function () {
        expect(videoCount(1200)).toBe(8);
        expect(videoCount(600)).toBe(1);
        expect(videoCount(450)).toBe(4);
        expect(videoCount(1600)).toBe(2);
    });
}); */

/* function add(a,b)
{
    return (a+b);
}
describe("Calculator", function () {
    it("should add two numbers together", function () {
        expect(add(1, 2)).toBe(3);
        //expect(add(1, 4)).toBe(7);
        expect(add(1, 4)).toBe(5);

    });
}); */