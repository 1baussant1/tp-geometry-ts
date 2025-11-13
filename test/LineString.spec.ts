import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString.ts";

describe ("test LineString", () =>{
    it ("test default constructor", () =>{
        const g = new LineString();
        expect (g.getType()).to.equal("LineString");
        expect (g.getNumPoints()).to.equal(0);

    });
    it ("test constructor with points", () =>{
        const a = new Point ([0.0,0.0]);
        const b = new Point ([3.0, 4.0]);
        const g = new LineString ([a,b]);
        expect (g.getNumPoints()).to.equal("LineString");
        expect (g.getPointN(0)).to.equal(a);
        expect (g.getPointN(1)).to.equal(b);
    })
})