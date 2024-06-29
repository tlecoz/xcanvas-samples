import { Path } from "xcanvas-ts";


export class PolygonPath extends Path {


    constructor(nbSide: number) {
        super();

        const a = (Math.PI * 2) / nbSide;
        let aa;
        for (let i = 0; i < nbSide; i++) {
            aa = a * (i + 1);
            if (i == 0) this.moveTo(Math.cos(aa), Math.sin(aa))
            else this.lineTo(Math.cos(aa), Math.sin(aa));
        }
        this.computePath();

    }

}
