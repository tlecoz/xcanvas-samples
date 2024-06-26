import { Align, Display2D, Group2D, RenderStack, SolidColor, SolidFill, SquarePath, Stage2D } from "xcanvas-ts";
import { Sample } from "./Sample";

export class Align_Sample extends Sample {

    protected async start(stage: Stage2D) {
        stage;









        const shapeStack = new RenderStack();
        shapeStack.push(SquarePath.instance);
        shapeStack.push(new SolidFill(new SolidColor(127, 127, 127)));


        const contener = stage.appendChild(new Group2D()) as Group2D;


        contener.x = stage.stageWidth * 0.5;
        contener.y = stage.stageHeight * 0.5;


        contener.appendChild(new Display2D(400, 400, shapeStack));

        contener.align(Align.CENTER);



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