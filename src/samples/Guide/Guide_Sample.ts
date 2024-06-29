import { Align, Display2D, Path, RenderStack, SolidColor, SolidFill, Stage2D } from "xcanvas-ts";
import { Sample } from "../Align/Sample";
import { ChristmasTreePath } from "../GetBounds/ChristmasTreePath";

export class Guide_Sample extends Sample {


    protected async start(stage: Stage2D) {


        const shape = stage.appendChild(new Display2D(500, 500, new RenderStack([
            ChristmasTreePath.instance,
            new SolidFill(new SolidColor(0xffcc00))
        ])))

        shape.x = stage.stageWidth * 0.5;
        shape.y = stage.stageHeight * 0.5;
        shape.align(Align.CENTER);


        const path: Path = shape.get((val) => val.isPath)[0];

        path
    }


}