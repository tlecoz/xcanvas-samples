import { Path } from "xcanvas-ts";

export class ChristmasTreePath extends Path {

    private static _instance: ChristmasTreePath;
    public static get instance(): ChristmasTreePath {
        if (!this._instance) this._instance = new ChristmasTreePath();
        return this._instance;
    }

    constructor() {
        super();
        if (ChristmasTreePath._instance) {
            /*
            It's not mandatory but it's better for memory-usage to use the same object 
            multiple times instead of creating new instance for each usecase.
            Do it whenever you can
            */
            throw new Error("ChristmaxTreePath is a singleton. You must use 'ChristmasTreeApp.instance' ");
        }

        this.moveTo(-2.2, -283.675);
        this.quadraticCurveTo(-2.1, -283.625, -2, -283.575);
        this.quadraticCurveTo(55.45, -173.875, 160.25, -66.125);
        this.quadraticCurveTo(131.25, -58.795, 102.25, -51.475);
        this.quadraticCurveTo(155.45, 6.775, 208.65, 65.025);
        this.quadraticCurveTo(186.38, 75.455, 164.1, 85.875);
        this.quadraticCurveTo(216.98, 141.955, 269.85, 198.025);
        this.quadraticCurveTo(229, 215.475, 177.85, 225.175);
        this.quadraticCurveTo(104.88, 235.275, 31.9, 245.375);
        this.quadraticCurveTo(32.03, 264.525, 32.15, 283.675);
        this.quadraticCurveTo(1.2, 283.675, -29.75, 283.675);
        this.quadraticCurveTo(-30.42, 264.125, -31.1, 244.575);
        this.quadraticCurveTo(-156.6, 240.225, -269.85, 201.225);
        this.quadraticCurveTo(-215.75, 145.475, -163.4, 84.825);
        this.quadraticCurveTo(-187.55, 76.825, -211.7, 68.825);
        this.quadraticCurveTo(-152.5, 13.325, -111.45, -49.975);
        this.quadraticCurveTo(-137.92, -56.845, -164.4, -63.725);
        this.quadraticCurveTo(-122.85, -102.675, -87.85, -147.475);
        this.quadraticCurveTo(-83.15, -153.675, -78.5, -159.875);
        this.quadraticCurveTo(-73.9, -166.125, -69.4, -172.475);
        this.quadraticCurveTo(-66.3, -176.825, -63.3, -181.225);
        this.quadraticCurveTo(-60.3, -185.575, -57.35, -189.925);
        this.quadraticCurveTo(-54.45, -194.275, -51.6, -198.625);
        this.quadraticCurveTo(-48.8, -202.925, -46, -207.225);
        this.quadraticCurveTo(-20.7, -246.675, -2.2, -283.675);
        this.computePath();
    }

}