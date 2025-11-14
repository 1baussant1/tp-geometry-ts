import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";

export default class LogGeometryVisitor implements GeometryVisitor {

    visitPoint(point: Point): void {
        if (point.isEmpty()) {
            console.log("I'm an empty point.");
        } else {
            console.log(`I'm a point defined by x=${point.x()} and y=${point.y()}.`);
        }
    }

    visitLineString(line: LineString): void {
        if (line.isEmpty()) {
            console.log("I'm an empty polyline.");
        } else {
            console.log(`I'm a polyline defined by ${line.getNumPoints()} points.`);
        }
    }
}