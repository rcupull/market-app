import { movRow } from "./general";

describe("movRow()", () => {
  it("should return a right value 1", async () => {
    expect(movRow(["a", "b", "c", "d", "e"], 1, 2)).toMatchInlineSnapshot(`
[
  "a",
  "c",
  "b",
  "d",
  "e",
]
`);
  });

  it("should return a right value 1", async () => {
    expect(movRow(["a", "b", "c", "d", "e"], 1, 4)).toMatchInlineSnapshot(`
[
  "a",
  "c",
  "d",
  "e",
  "b",
]
`);
  });
});
