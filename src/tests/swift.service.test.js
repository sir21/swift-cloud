const _ = require("lodash");
const { getSwiftService } = require("../services/swift.service");

describe("app test", () => {
  it("should return will all the data if no query set", async () => {
    const result = await getSwiftService({});
    expect(result).not.toBeNull();
    expect(result.length).toEqual(172);
  });

  it("should return will all the data if columns `all` and should include all columns", async () => {
    const result = await getSwiftService({ columns: "All" });
    expect(result).not.toBeNull();
    expect(result.length).toEqual(172);
    expect(result[0].song).toBeDefined();
    expect(result[0].artist).toBeDefined();
    expect(result[0].album).toBeDefined();
    expect(result[0].writer).toBeDefined();
    expect(result[0].year).toBeDefined();
    expect(result[0].plays_june).toBeDefined();
    expect(result[0].plays_july).toBeDefined();
    expect(result[0].plays_august).toBeDefined();
  });

  it("should return will all the data if columns `song` and should include only `song`", async () => {
    const result = await getSwiftService({ columns: "song" });
    expect(result).not.toBeNull();
    expect(result.length).toEqual(172);
    expect(result[0].song).toBeDefined();
    expect(result[0].artist).not.toBeDefined();
    expect(result[0].album).not.toBeDefined();
    expect(result[0].writer).not.toBeDefined();
    expect(result[0].year).not.toBeDefined();
    expect(result[0].plays_june).not.toBeDefined();
    expect(result[0].plays_july).not.toBeDefined();
    expect(result[0].plays_august).not.toBeDefined();
  });

  it("should return most played song for all 3 months if requested", async () => {
    const result = await getSwiftService({ order: "plays_june|plays_july|plays_august DESC", limit: 1});
    expect(result.length).toEqual(1);
    expect(result[0].song).toEqual("Style");
  });

  it("should return songs in 2012 and 2014 if requested", async () => {
    const result = await getSwiftService({ search: "year|in|2012 2014"});
    expect(result.length).toEqual(39);
    const yearMap = _.uniq(result.map((r) => r.year));
    expect(yearMap).toEqual([2012, 2014]);
  });
});
