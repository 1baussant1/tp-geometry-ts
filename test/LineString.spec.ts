import "mocha";
import { expect } from "chai";
import Point from "../src/Point";

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
});
