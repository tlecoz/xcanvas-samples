import { Align, CirclePath, Display2D, Group2D, LineStyle, RenderStack, SolidColor, SolidFill, SolidTextFill, SquarePath, Stage2D, TextPath, TextStyle } from "xcanvas-ts";
import { Sample } from "./Sample";

export class Align_Sample extends Sample {

    protected async start(stage: Stage2D) {

        const contener = stage.appendChild(new Group2D()) as Group2D;

        contener.x = stage.stageWidth * 0.5;
        contener.y = stage.stageHeight * 0.5;
        contener.align(Align.CENTER);

        const size = 400;

        const background = contener.appendChild(new Display2D(size, size));
        background.stack(SquarePath.instance);
        background.stack(new SolidFill(new SolidColor(127, 127, 127)));
        background.x = background.y = size * 0.5;
        background.align(Align.CENTER);

        const textStyle = new TextStyle("Arial", 40, "px");
        textStyle.lineStyle = new LineStyle(3);

        const redSquare = new RenderStack([
            SquarePath.instance,
            new SolidFill(new SolidColor(127, 0, 0)),
            new TextPath("TL"),
            new SolidTextFill(textStyle, new SolidColor(255, 255, 255))
        ]);


        const cloneStack: boolean = true;
        const topLeft = contener.appendChild(new Display2D(100, 100, redSquare));
        topLeft.get((val) => val.isTextPath, cloneStack)[0].text = "TL"
        topLeft.align(Align.TOP_LEFT);


        const topRight = contener.appendChild(new Display2D(100, 100, redSquare));
        topRight.get((val) => val.isTextPath, cloneStack)[0].text = "TR"
        topRight.align(Align.TOP_RIGHT);
        topRight.x = size;


        const bottomRight = contener.appendChild(new Display2D(100, 100, redSquare));
        bottomRight.get((val) => val.isTextPath, cloneStack)[0].text = "BR"
        bottomRight.align(Align.BOTTOM_RIGHT);
        bottomRight.x = bottomRight.y = size


        const bottomLeft = contener.appendChild(new Display2D(100, 100, redSquare));
        bottomLeft.get((val) => val.isTextPath, cloneStack)[0].text = "BL"
        bottomLeft.align(Align.BOTTOM_LEFT);
        bottomLeft.y = size


        //------
        const orangeSquare = new RenderStack([
            SquarePath.instance,
            new SolidFill(new SolidColor(127, 63, 0))
        ]);

        const topCenter = contener.appendChild(new Display2D(50, 50, orangeSquare));
        topCenter.x = size / 2
        topCenter.align(Align.TOP_CENTER);


        const centerRight = contener.appendChild(new Display2D(50, 50, orangeSquare));
        centerRight.y = size / 2
        centerRight.x = size;
        centerRight.align(Align.CENTER_RIGHT);

        const bottomCenter = contener.appendChild(new Display2D(50, 50, orangeSquare));
        bottomCenter.y = size;
        bottomCenter.x = size / 2;
        bottomCenter.align(Align.BOTTOM_CENTER);

        const centerLeft = contener.appendChild(new Display2D(50, 50, orangeSquare));
        centerLeft.y = size / 2
        centerLeft.align(Align.CENTER_LEFT);


        //------
        const blueCircle = new RenderStack([
            CirclePath.instance,
            new SolidFill(new SolidColor(0, 0, 127))
        ]);

        const center = contener.appendChild(new Display2D(50, 50, blueCircle));
        center.x = center.y = size / 2
        center.align(Align.CENTER);

        stage.addEventListener(Stage2D.DRAW_BEGIN, () => {

            contener.rotation += 0.1;
        })

    }

}