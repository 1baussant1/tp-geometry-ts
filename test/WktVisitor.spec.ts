import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import WktVisitor from "../src/WktVisitor";

describe("WktVisitor", () => {

  it("should return POINT EMPTY for an empty point", () => {
    const point = new Point();
    const visitor = new WktVisitor();

    point.accept(visitor);
    const wkt = visitor.getResult();

    expect(wkt).to.equal("POINT EMPTY");
  });

  it("should return POINT(x y) for a non-empty point", () => {
    const point = new Point([2, 3]);
    const visitor = new WktVisitor();

    point.accept(visitor);
    const wkt = visitor.getResult();

    expect(wkt).to.equal("POINT(2 3)");
  });

  it("should return LINESTRING EMPTY for an empty LineString", () => {
    const line = new LineString();
    const visitor = new WktVisitor();

    line.accept(visitor);
    const wkt = visitor.getResult();

    expect(wkt).to.equal("LINESTRING EMPTY");
  });

  it("should return LINESTRING(x1 y1,x2 y2,...) for a non-empty LineString", () => {
    const points = [new Point([0, 0]), new Point([1, 1]), new Point([5, 5])];
    const line = new LineString(points);
    const visitor = new WktVisitor();

    line.accept(visitor);
    const wkt = visitor.getResult();

    expect(wkt).to.equal("LINESTRING(0 0,1 1,5 5)");
  });

  it("should allow multiple visits with the same visitor", () => {
    const point = new Point([1, 1]);
    const line = new LineString([new Point([0, 0]), new Point([2, 2])]);
    const visitor = new WktVisitor();

    point.accept(visitor);
    expect(visitor.getResult()).to.equal("POINT(1 1)");

    line.accept(visitor);
    expect(visitor.getResult()).to.equal("LINESTRING(0 0,2 2)");
  });

  it("should throw TypeError for unsupported geometry", () => {
    const visitor = new WktVisitor();
    const badGeometry = {} as any;

    expect(() => badGeometry.accept(visitor)).to.throw(TypeError);
  });

});
