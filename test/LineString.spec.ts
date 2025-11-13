import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString.ts";

describe("test LineString", () => {
    it("test default constructor", () => {
        const g = new LineString();
        expect(g.getType()).to.equal("LineString");
        expect(g.getNumPoints()).to.equal(0);
        expect(g.isEmpty()).to.be.true;

    });

    it("test constructor with points", () => {
        const a = new Point([0.0, 0.0]);
        const b = new Point([3.0, 4.0]);
        const g = new LineString([a, b]);
        expect(g.isEmpty()).to.be.false;
        expect(g.getNumPoints()).to.equal(2);
        expect(g.getPointN(0)).to.equals(a);
        expect(g.getPointN(1)).to.equals(b);
    });

    it("test should translate points", () => {
        const g = new Point([3.0, 4.0]);
        g.translate(1.0, 2.0);
        expect(g.getCoordinate()).to.deep.equal([4.0, 6.0]);
    });

    it("should not modify empty point", () => {
        const g = new Point();
        g.translate(1.0, 2.0);
        expect(g.isEmpty()).to.be.true
    });

    it("should create a similar instance", () => {
        const p1 = new Point([2, 3]);
        const p2 = p1.clone() as Point;

        expect(p2).to.not.equal(p1);
        expect(p2.getCoordinate()).to.deep.equal([2, 3]);
    });

    it("copy should be independant", () => {
        const p1 = new Point([1, 1]);
        const p2 = p1.clone() as Point;

        p2.translate(5, 5);

        expect(p1.getCoordinate()).to.deep.equal([1, 1]);
        expect(p2.getCoordinate()).to.deep.equal([6, 6]);
    });

});