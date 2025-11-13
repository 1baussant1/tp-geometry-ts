import Envelope from "./Envelope";

export default class EnvelopeBuilder {
    private xVals: number[] = [];
    private yVals: number[] = [];

    insert(coord: number[]): void {
        if (coord.length === 2 && !coord.some((v) => isNaN(v))) {
            this.xVals.push(coord[0]);
            this.yVals.push(coord[1]);
        }
    }

    build(): Envelope {
        if (this.xVals.length === 0 || this.yVals.length === 0) {
            return new Envelope();
        }

        const minX = Math.min(...this.xVals);
        const minY = Math.min(...this.yVals);
        const maxX = Math.max(...this.xVals);
        const maxY = Math.max(...this.yVals);

        return new Envelope([minX, minY], [maxX, maxY]);
    }
}
