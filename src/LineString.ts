import Geometry from "./Geometry";
import Point from "./Point";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";    
import GeometryVisitor from "./GeometryVisitor";
import AbstractGeometry from "./AbstractGeometry";

export default class LineString extends AbstractGeometry {
    private points: Point[];
    
    constructor(points?: Point[]) {
    super();    
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
        this.points.forEach(point => point.translate(dx, dy));
    }

    clone(): Geometry {
        const copiedPoints = this.points.map(p => p.clone() as Point);
        return new LineString(copiedPoints);
    }
     getEnvelope(): Envelope {
        const builder = new EnvelopeBuilder();
        this.points.forEach((p) => {
            if (!p.isEmpty()) builder.insert(p.getCoordinate());
        });
        return builder.build();
    }
    accept(visitor: any): void {
        visitor.visitLineString(this);
    }   
}
