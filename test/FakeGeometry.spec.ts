import AbstractGeometry from "../src/AbstractGeometry";
import Geometry from "../src/Geometry";

export default class FakeGeometry extends AbstractGeometry {

    private visitorLog: any = null;

    constructor() {
        super();
    }

    getType(): string {
        return "Fake";
    }

    isEmpty(): boolean {
        return false;
    }

    translate(): void {
    }

    clone(): Geometry {
        return new FakeGeometry();
    }

    getEnvelope(): any {
        return null;
    }

    accept(visitor: any): void {
        this.visitorLog = visitor;
        visitor.visitFake?.(this);
    }

    getLastVisitor(): any {
        return this.visitorLog;
    }
}
