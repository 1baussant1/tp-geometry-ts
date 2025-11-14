import { expect } from "chai";
import FakeGeometry from "./FakeGeometry.spec";
import WktVisitor from "../src/WktVisitor";

describe("AbstractGeometry - Facade asText()", () => {

    it("should call accept(visitor) when asText() is called", () => {
        const fake = new FakeGeometry();

        const result = fake.asText();

        expect(result).to.equal("FAKE GEOMETRY");
        expect(fake.getLastVisitor()).to.be.instanceOf(WktVisitor);
    });

    it("should create a new visitor on each call", () => {
        const fake = new FakeGeometry();

        const wkt1 = fake.asText();
        const visitor1 = fake.getLastVisitor();

        const wkt2 = fake.asText();
        const visitor2 = fake.getLastVisitor();

        expect(wkt1).to.equal("FAKE GEOMETRY");
        expect(wkt2).to.equal("FAKE GEOMETRY");

        expect(visitor1).to.not.equal(visitor2);
    });
});
