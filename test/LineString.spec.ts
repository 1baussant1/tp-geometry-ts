import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import WktWriter from "../src/WktWriter";
import LineString from "../src/LineString";

describe("Test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.deep.equal([]);
        expect(Number.isNaN(p.x())).to.be.true;
        expect(Number.isNaN(p.y())).to.be.true;
        expect(p.isEmpty()).to.be.true;
        expect(p.getType()).to.equal("Point");
    });

    it("test constructor with coordinates", () => {
        const p = new Point([3.0, 4.0]);
        expect(p.isEmpty()).to.be.false;
        expect(p.getCoordinate()).to.deep.equal([3.0, 4.0]);
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
    });

    it("translate() should move point correctly", () => {
        const p = new Point([3.0, 4.0]);
        p.translate(1.0, 2.0);
        expect(p.getCoordinate()).to.deep.equal([4.0, 6.0]);
    });

    it("translate() should not modify empty point", () => {
        const p = new Point();
        p.translate(1.0, 2.0);
        expect(p.isEmpty()).to.be.true;
        expect(Number.isNaN(p.x())).to.be.true;
    });

    it("clone() should create a similar but independent instance", () => {
        const p1 = new Point([2, 3]);
        const p2 = p1.clone() as Point;

        expect(p2).to.not.equal(p1);
        expect(p2.getCoordinate()).to.deep.equal([2, 3]);

        p2.translate(5, 0);
        expect(p1.getCoordinate()).to.deep.equal([2, 3]);
        expect(p2.getCoordinate()).to.deep.equal([7, 3]);
    });

    it("getEnvelope() should return a valid envelope", () => {
        const p = new Point([5, 10]);
        const env = p.getEnvelope();
        expect(env.getBottomLeft()).to.deep.equal([5, 10]);
        expect(env.getTopRight()).to.deep.equal([5, 10]);
        expect(env.isEmpty()).to.be.false;
    });

    it("getEnvelope() of an empty point should return an empty envelope", () => {
        const p = new Point();
        const env = p.getEnvelope();
        expect(env.isEmpty()).to.be.true;
    });
    
    it("default constructor should create empty linestring", () => {
        const ls = new LineString();
        expect(ls.isEmpty()).to.be.true;
        expect(ls.getNumPoints()).to.equal(0);
        expect(ls.getType()).to.equal("LineString");
    });

    it("constructor with points should store them correctly", () => {
        const p1 = new Point([0, 0]);
        const p2 = new Point([1, 1]);
        const ls = new LineString([p1, p2]);

        expect(ls.isEmpty()).to.be.false;
        expect(ls.getNumPoints()).to.equal(2);
        expect(ls.getPointN(0).getCoordinate()).to.deep.equal([0, 0]);
        expect(ls.getPointN(1).getCoordinate()).to.deep.equal([1, 1]);
    });

    it("translate() should move all points", () => {
        const ls = new LineString([
            new Point([0, 0]),
            new Point([1, 1])
        ]);

        ls.translate(2, 3);

        expect(ls.getPointN(0).getCoordinate()).to.deep.equal([2, 3]);
        expect(ls.getPointN(1).getCoordinate()).to.deep.equal([3, 4]);
    });

    it("translate() on empty LineString should not crash", () => {
        const ls = new LineString();
        ls.translate(10, 10);
        expect(ls.getNumPoints()).to.equal(0);
    });

    it("clone() should produce a deep copy", () => {
        const ls = new LineString([
            new Point([0, 0]),
            new Point([1, 1])
        ]);

        const copy = ls.clone() as LineString;
        expect(copy).to.not.equal(ls);
        expect(copy.getNumPoints()).to.equal(2);
        expect(copy.getPointN(0).getCoordinate()).to.deep.equal([0, 0]);
        copy.getPointN(0).translate(100, 100);
        expect(ls.getPointN(0).getCoordinate()).to.deep.equal([0, 0]);
    });

    it("getEnvelope should compute correct bbox", () => {
        const ls = new LineString([
            new Point([0, 1]),
            new Point([2, -1]),
            new Point([1, 3])
        ]);

        const env = ls.getEnvelope();
        expect(env.getMinX()).to.equal(0);
        expect(env.getMinY()).to.equal(-1);
        expect(env.getMaxX()).to.equal(2);
        expect(env.getMaxY()).to.equal(3);
    });

    it("getEnvelope() of empty LineString should be empty", () => {
        const ls = new LineString();
        const env = ls.getEnvelope();
        expect(env.isEmpty()).to.be.true;
    });

    it("WKT writer should output LINESTRING EMPTY", () => {
        const ls = new LineString();
        const writer = new WktWriter();
        expect(writer.write(ls)).to.equal("LINESTRING EMPTY");
    });

    it("WKT writer should output valid LINESTRING WKT", () => {
        const ls = new LineString([
            new Point([0, 0]),
            new Point([1, 1]),
            new Point([5, 5])
        ]);

        const writer = new WktWriter();
        expect(writer.write(ls)).to.equal("LINESTRING(0 0,1 1,5 5)");
    });

});
