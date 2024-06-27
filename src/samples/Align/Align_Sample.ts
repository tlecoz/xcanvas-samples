import { Align, Display2D, Group2D, RenderStack, SolidColor, SolidFill, SquarePath, Stage2D } from "xcanvas-ts";
import { Sample } from "./Sample";

export class Align_Sample extends Sample {

    protected async start(stage: Stage2D) {
        stage;










        const contener = stage.appendChild(new Group2D()) as Group2D;
        contener.align(Align.CENTER);

        contener.x = stage.stageWidth * 0.5;
        contener.y = stage.stageHeight * 0.5;

        const size = 400;



        const background = contener.appendChild(new Display2D(size, size));
        background.stack(SquarePath.instance);
        background.stack(new SolidFill(new SolidColor(127, 127, 127)));
        background.x = background.y = size * 0.5;
        background.align(Align.CENTER);

        const redSquare = new RenderStack([
            SquarePath.instance,
            new SolidFill(new SolidColor(127, 0, 0))
        ]);


        const topLeft = contener.appendChild(new Display2D(100, 100, redSquare));
        topLeft.align(Align.TOP_LEFT);

        const topRight = contener.appendChild(new Display2D(100, 100, redSquare));
        topRight.align(Align.TOP_RIGHT);
        topRight.x = size

        const bottomRight = contener.appendChild(new Display2D(100, 100, redSquare));
        bottomRight.align(Align.BOTTOM_RIGHT);
        bottomRight.x = bottomRight.y = size

        const bottomLeft = contener.appendChild(new Display2D(100, 100, redSquare));
        bottomLeft.align(Align.BOTTOM_LEFT);
        bottomLeft.y = size





        stage.addEventListener(Stage2D.DRAW_BEGIN, () => {
            //console.log("draw")

            contener.rotation += 0.1;
        })







        /*
       const col1 = new SolidColor(255, 0, 0, 1);
       const col2 = new SolidColor(0, 0, 255, 1);

       const gradient = new GradientColor([col1, col2], [0.25, 0.75], false)
       const gradientFill = new GradientFill(gradient);

       shapeStack.push(gradientFill)
       */

    }

}