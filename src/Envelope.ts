export default class Envelope {
    private bottomLeft: number[];
    private topRight: number[];

    constructor(bottomLeft?: number[], topRight?: number[]) {
    
        this.bottomLeft = bottomLeft ?? [NaN, NaN];
        this.topRight = topRight ?? [NaN, NaN];
    }

    getBottomLeft(): number[] {
        return this.bottomLeft;
    }

    getTopRight(): number[] {
        return this.topRight;
    }

    getMinX(): number {
        return this.bottomLeft[0];
    }

    getMinY(): number {
        return this.bottomLeft[1];
    }

    getMaxX(): number {
        return this.topRight[0];
    }

    getMaxY(): number {
        return this.topRight[1];
    }

    width(): number {
        if (this.isEmpty()) return NaN;
        return this.topRight[0] - this.bottomLeft[0];
    }

    height(): number {
        if (this.isEmpty()) return NaN;
        return this.topRight[1] - this.bottomLeft[1];
    }

    isEmpty(): boolean {
        return (
            Number.isNaN(this.bottomLeft[0]) ||
            Number.isNaN(this.bottomLeft[1]) ||
            Number.isNaN(this.topRight[0]) ||
            Number.isNaN(this.topRight[1])
        );
    }

    toString(): string {
        return `Envelope(bottomLeft=${this.bottomLeft}, topRight=${this.topRight})`;
    }
}
