import Geometry from "./Geometry";
import Point from "./Point";

export default class LineString implements Geometry {
    private points: Point[];

    constructor(points?: Point[]) {
        this.points = points || [];

    }
    getType(): string {
        return "LineString";

    }

    isEmpty(): boolean {
        return this.points.length == 0;
    }
    getNumPoints(): number {
        return this.points.length;
    }
    
    getPointN(n: number): Point {
        return this.points[n];
    }
    translate(dx: number, dy: number): void {
        this.points.forEach(point=>point.translate(dx, dy));
    }
}
