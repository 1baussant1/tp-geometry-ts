import Geometry from "./Geometry";
import WktVisitor from "./WktVisitor";

export default abstract class AbstractGeometry implements Geometry {

    abstract getType(): string;
    abstract isEmpty(): boolean;
    abstract translate(dx: number, dy: number): void;
    abstract clone(): Geometry;
    abstract getEnvelope(): any;
    abstract accept(visitor: any): void;

    asText(): string {
        const visitor = new WktVisitor();
        this.accept(visitor);
        return visitor.getResult();
    }
}
