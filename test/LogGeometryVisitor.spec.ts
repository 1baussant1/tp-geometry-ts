import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import LogGeometryVisitor from "../src/LogGeometryVisitor";

describe("Test LogGeometryVisitor", () => {
    let output: string[];

    const captureLog = (msg: string) => {
        output.push(msg);
    };

    beforeEach(() => {
        output = [];
        (console as any).log = captureLog;
    });

    afterEach(() => {
        (console as any).log = console.constructor.prototype.log;
    });

    it("should log an empty point", () => {
        const visitor = new LogGeometryVisitor();
        const point = new Point();
        point.accept(visitor);
        expect(output).to.deep.equal(["I'm an empty point."]);
    });

    it("should log a non-empty point", () => {
        const visitor = new LogGeometryVisitor();
        const point = new Point([2.0, 3.0]);
        point.accept(visitor);
        expect(output).to.deep.equal(["I'm a point defined by x=2 and y=3."]);
    });

    it("should log an empty LineString", () => {
        const visitor = new LogGeometryVisitor();
        const line = new LineString();
        line.accept(visitor);
        expect(output).to.deep.equal(["I'm an empty polyline."]);
    });

    it("should log a non-empty LineString", () => {
        const visitor = new LogGeometryVisitor();
        const p1 = new Point([0, 0]);
        const p2 = new Point([1, 1]);
        const p3 = new Point([5, 5]);
        const line = new LineString([p1, p2, p3]);
        line.accept(visitor);
        expect(output).to.deep.equal(["I'm a polyline defined by 3 points."]);
    });
});
