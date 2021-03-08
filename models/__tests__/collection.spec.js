const { Collection } = require("../collection");

describe("Collection model", () => {
  test("name must be required", async () => {
    expect.assertions(1);

    try {
      await Collection.create({
        flashcards: [
          { question: "What is C#", answer: "Another programming language" },
        ],
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  test("flashcards should default to empty array", async () => {
    try {
      const { _id, __v, ...collection } = (
        await Collection.create({
          name: "Programming Languages",
        })
      ).toObject();

      expect(collection.flashcards).toBeTruthy();
    } catch (e) {
      console.log(e);
    }
  });

  test("should have correct fields", async () => {
    const { _id, __v, ...collection } = (
      await Collection.create({
        name: "Programming Languages",
        flashcards: [
          { question: "What is C#", answer: "Another programming language" },
        ],
      })
    ).toObject();

    expect(collection.flashcards[0].question).toBe("What is C#");
    expect(collection.flashcards[0].answer).toBe(
      "Another programming language"
    );
    expect(collection.name).toBe("Programming Languages");
  });
});
