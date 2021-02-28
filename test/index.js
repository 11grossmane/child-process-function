var chai = require("chai");
var sinon = require("sinon");
require("mocha-sinon");
var { timer, logAfter } = require("./helpers");
var spawn = require("../src");
chai.use(require("sinon-chai"));
var expect = chai.expect;

describe("spawn function", () => {
  beforeEach(function () {
    if (this.sinon) {
      this.sinon.restore();
    } else {
      this.sinon = sinon.createSandbox();
    }
  });
  it('should log "after" before "done counting"', async () => {
    const spy = sinon.spy(console, "log");

    spawn(timer);
    logAfter();

    await new Promise((res) => setTimeout(() => res(null), 1500));

    const result = spy.getCalls().map(({ args }) => args[0]);

    expect(result.indexOf("timer finished")).to.be.lessThan(
      result.indexOf("after")
    );
  });
});
