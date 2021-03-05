const Flashcard = require("../flashcard");

describe("Flashcard model", () => {
  test("question must be required", async () => {
    expect.assertions(1);

    try {
      await Flashcard.create({
        answer: "A programming language.",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  test("answer must be required", async () => {
    expect.assertions(1);

    try {
      await Flashcard.create({
        question: "What is JavaScript?",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  test("should have correct fields", async () => {
    const { _id, __v, ...flashcard } = (
      await Flashcard.create({
        question: "What is JavaScript?",
        answer: "A programming language",
      })
    ).toObject();

    expect(flashcard).toEqual({
      question: "What is JavaScript?",
      answer: "A programming language",
    });
  });
});
