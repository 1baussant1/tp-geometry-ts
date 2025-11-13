import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString.ts";

describe ("test LineString", () =>{
    it ("test default constructor", () =>{
        const g = new LineString();
        expect (g.getType()).to.equal("LineString");
        expect (g.getNumPoints()).to.equal(0);
        expect (g.isEmpty()).to.be.true;

    });
    it ("test constructor with points", () => {
        const a = new Point ([0.0,0.0]);
        const b = new Point ([3.0, 4.0]);
        const g = new LineString ([a,b]);
        expect (g.isEmpty()).to.be.false;
        expect (g.getNumPoints()).to.equal(2);
        expect (g.getPointN(0)).to.equals(a);
        expect (g.getPointN(1)).to.equals(b);
    })
})