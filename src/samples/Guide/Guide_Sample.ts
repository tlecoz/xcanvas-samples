import { Align, CirclePath, Display2D, RenderStack, SolidColor, SolidFill, Stage2D } from "xcanvas-ts";
import { Sample } from "../Align/Sample";
import { ChristmasTreePath } from "../GetBounds/ChristmasTreePath";

export class Guide_Sample extends Sample {


    protected async start(stage: Stage2D) {


        const shapeSize = 500;
        const path = ChristmasTreePath.instance.clone();
        const shape = stage.appendChild(new Display2D(shapeSize, shapeSize, new RenderStack([
            path,
            new SolidFill(new SolidColor(0xffcc00))
        ])))

        const interactivePath = ChristmasTreePath.instance.getInteractivePath(shape);

        shape.x = stage.stageWidth * 0.5;
        shape.y = stage.stageHeight * 0.5;
        shape.align(Align.CENTER);

        const circle = stage.appendChild(new Display2D(20, 20, new RenderStack([
            CirclePath.instance,
            new SolidFill(new SolidColor(0xff0000)),
        ])))
        circle.align(Align.CENTER);

        const startTime = new Date().getTime();
        const durationInMilliseconds = 5000;
        stage.addEventListener(Stage2D.DRAW_BEGIN, () => {
            if (!interactivePath) return;
            const time = new Date().getTime() - startTime;

            const { x, y } = interactivePath.getPointAtTime(shape, time, durationInMilliseconds);
            circle.x = x;
            circle.y = y;
        })


    }


}