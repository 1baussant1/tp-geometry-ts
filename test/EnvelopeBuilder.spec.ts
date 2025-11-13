import "mocha";
import { expect } from "chai";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";   


//describe("test EnvelopeBuilder", () => {
//    it("should build empty envelope when no coordinates inserted", () => {
//        const builder = new EnvelopeBuilder();
//        const env = builder.build();
//        expect(Number.isNaN(env.getMinX())).to.be.true;
//        expect(Number.isNaN(env.getMinY())).to.be.true;
//        expect(Number.isNaN(env.getMaxX())).to.be.true;
//        expect(Number.isNaN(env.getMaxY())).to.be.true;
//    });

describe("test EnvelopeBuilder", () => {

    it("should calculate a simple bbox", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([0, 1]);
        builder.insert([2, 0]);
        builder.insert([1, 3]);
        const env = builder.build();
        expect(env.getMinX()).to.equal(0);
        expect(env.getMaxX()).to.equal(2);
        expect(env.getMinY()).to.equal(0);
        expect(env.getMaxY()).to.equal(3);
        expect(env.width()).to.equal(2);
        expect(env.height()).to.equal(3);
    });

    it("should deal with a single point", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([5, 7]);
        const env = builder.build();
        expect(env.getMinX()).to.equal(5);
        expect(env.getMaxX()).to.equal(5);
        expect(env.getMinY()).to.equal(7);
        expect(env.getMaxY()).to.equal(7);
        expect(env.width()).to.equal(0);
        expect(env.height()).to.equal(0);
    });

    it("should deal with absence of points", () => {
        const builder = new EnvelopeBuilder();
        const env = builder.build();
        expect(Number.isNaN(env.getMinX())).to.be.true;
        expect(Number.isNaN(env.getMaxX())).to.be.true;
        expect(Number.isNaN(env.getMinY())).to.be.true;
        expect(Number.isNaN(env.getMaxY())).to.be.true;
    });

    it("should ignore incorrect coordinates", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([1]);        
        builder.insert([2, 2]);    
        builder.insert([]);         
        const env = builder.build();
        expect(env.getMinX()).to.equal(2);
        expect(env.getMaxX()).to.equal(2);
        expect(env.getMinY()).to.equal(2);
        expect(env.getMaxY()).to.equal(2);
    });
});
