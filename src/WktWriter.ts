import Geometry from "./Geometry";
import Point from "./Point";
import LineString from "./LineString";

export default class WktWriter {
    write(geometry: Geometry): string {
        if (geometry instanceof Point) {
            return this.writePoint(geometry);
        } else if (geometry instanceof LineString) {
            return this.writeLineString(geometry);
        } else {
            throw new TypeError("geometry type not supported");
        }
    }

    private writePoint(point: Point): string {
        if (point.isEmpty()) {
            return "POINT EMPTY";
        }
        const coord = point.getCoordinate();
        return `POINT(${coord.join(" ")})`;
    }

    private writeLineString(line: LineString): string { 
        if (line.isEmpty()) {
            return "LINESTRING EMPTY";
        }

        const parts: string[] = [];
        for (let i = 0; i < line.getNumPoints(); i++) {
            const coord = line.getPointN(i).getCoordinate();
            parts.push(coord.join(" "));
        }

        return `LINESTRING(${parts.join(",")})`;
    }
}
