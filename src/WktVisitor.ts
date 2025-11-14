import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";

export default class WktVisitor implements GeometryVisitor {
    private result: string = "";

    visitPoint(point: Point): void {
        if (point.isEmpty()) {
            this.result = "POINT EMPTY";
        } else {
            const coord = point.getCoordinate();
            this.result = `POINT(${coord.join(" ")})`;
        }
    }

    visitLineString(line: LineString): void {
        if (line.isEmpty()) {
            this.result = "LINESTRING EMPTY";
        } else {
            const parts: string[] = [];
            for (let i = 0; i < line.getNumPoints(); i++) {
                const coord = line.getPointN(i).getCoordinate();
                parts.push(coord.join(" "));
            }
            this.result = `LINESTRING(${parts.join(",")})`;
        }
    }

    getResult(): string {
        return this.result;
    }
}   