import "mocha";
import { expect } from "chai";
import Point from "../src/Point";

describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.deep.equal([]);
        expect(Number.isNaN(p.x()));
        expect(Number.isNaN(p.y()));
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

    it("test should translate points", () => {
        const p = new Point([3.0, 4.0]);
        p.translate(1.0, 2.0);
        expect(p.getCoordinate()).to.deep.equal([4.0, 6.0]);
    });

    it("should not modify empty point", () => {
        const p = new Point();
        p.translate(1.0, 2.0);
        expect(p.isEmpty()).to.be.true
    });

    it("should create a similar instance", () => {
        const p1 = new Point([2, 3]);
        const p2 = p1.clone();

        expect(p2).to.deep.equal(p1);
        expect(p2.getCoordinate()).to.deep.equal([2, 3]);
    });

    it("copy should be independant", () => {
        const p1 = new Point([1, 1]);
        const p2 = p1.clone();

        p2.translate(5, 5);


        expect(p1.getCoordinate()).to.deep.equal([1, 1]);
        expect(p2.getCoordinate()).to.deep.equal([6, 6]);
    });

});


