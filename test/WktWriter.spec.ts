import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import WktWriter from "../src/WktWriter";

describe("Test WktWriter", () => {
    let writer: WktWriter;

    beforeEach(() => {
        writer = new WktWriter();
    });

    it("should write POINT EMPTY for an empty point", () => {
        const p = new Point();
        const wkt = writer.write(p);
        expect(wkt).to.equal("POINT EMPTY");
    });

    it("should write POINT(x y) for a non-empty point", () => {
        const p = new Point([3.0, 4.0]);
        const wkt = writer.write(p);
        expect(wkt).to.equal("POINT(3 4)");
    });

    it("should write LINESTRING EMPTY for an empty linestring", () => {
        const ls = new LineString();
        const wkt = writer.write(ls);
        expect(wkt).to.equal("LINESTRING EMPTY");
    });

    it("should write LINESTRING(x1 y1,x2 y2,...) for a non-empty linestring", () => {
        const ls = new LineString([
            new Point([0.0, 0.0]),
            new Point([1.0, 1.0]),
            new Point([5.0, 5.0])
        ]);
        const wkt = writer.write(ls);
        expect(wkt).to.equal("LINESTRING(0 0,1 1,5 5)");
    });


});
