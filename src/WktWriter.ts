import Geometry from "./Geometry";
import Point from "./Point";
import LineString from "./LineString";


export default class WktWriter {

    write(geometry: Geometry): string {
        if (geometry instanceof Point) {
            if (geometry.isEmpty()) return "POINT EMPTY";
            return `POINT(${geometry.getCoordinate().map(c => Number(c)).join(" ")})`;
        }

        if (geometry instanceof LineString) {
            if (geometry.isEmpty()) return "LINESTRING EMPTY";
            return `LINESTRING(${Array.from({length: geometry.getNumPoints()}, (_, i) =>
                geometry.getPointN(i).getCoordinate().map(c => Number(c)).join(" ")
            ).join(",")})`;
        }

        throw new TypeError("geometry type not supported");
    }
}
