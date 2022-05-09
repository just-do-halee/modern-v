import { getMode } from "../src";
import joinMode from "../src/functions/joinMode";
import getEnvs from "../src/functions/getEnvs";

describe("joinMode", () => {
  const mode = getMode();

  require("dotenv").config({
    path: "tests/.env.test",
  });

  it("Should be preserved", () => {
    const options = joinMode(mode, {
      __PRESERVED_TEST__: "",
    });
    expect(options).toStrictEqual({
      __MODE__: "test",
      __PRESERVED_TEST__: "__PRESERVED_TEST__",
    });
  });

  it("Should be extracted", () => {
    const envs = getEnvs({
      FOO: "",
    });
    expect(envs).toStrictEqual({
      FOO: "BAR",
    });
  });
});
