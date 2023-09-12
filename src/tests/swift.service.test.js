const { getSwiftService } = require("../services/swift.service");

describe("app test", () => {
  it("should return will all the data if no query set", async () => {
    const result = await getSwiftService({});
    expect(result).not.toBeNull();
    expect(result.length).toEqual(172)
  });
});
