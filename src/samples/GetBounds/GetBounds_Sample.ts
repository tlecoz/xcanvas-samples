import { Align, CirclePath, Display2D, LineStyle, Path, Rectangle2D, RenderStack, SolidColor, SolidFill, SolidStroke, SquarePath, Stage2D } from "xcanvas-ts";
import { Sample } from "../Align/Sample";

export class GetBounds_Sample extends Sample {

    protected async start(stage: Stage2D) {


        const boundStack = new RenderStack([
            SquarePath.instance,
            new SolidStroke(new SolidColor(127, 0, 0), new LineStyle(5))
        ])



        const createElement = (x: number, y: number, w: number, h: number, path: Path): { display: Display2D, bound: Display2D } => {
            //
            const bound = stage.appendChild(new Display2D(0.1, 0.1, boundStack));
            bound.align(Align.CENTER);




            const display = stage.appendChild(new Display2D(w, h));
            display.stack(path);
            display.stack(new SolidFill(new SolidColor(127, 127, 127)));
            bound.x = display.x = x + w * 0.5
            bound.y = display.y = y + h * 0.5;
            display.align(Align.CENTER);

            return {
                bound,
                display
            }
        }


        const updateElement = (element: { bound: Display2D, display: Display2D }) => {
            element.display.rotation += 0.1 //= 15;
            const r: Rectangle2D = element.display.updateBounds();

            if (r) {
                element.bound.x = r.x //- r.width * 0.5;
                element.bound.y = r.y //- r.height * 0.5;
                element.bound.width = r.width;
                element.bound.height = r.height;
            }
        }



        const path: Path = new Path();
        path.moveTo(0, 0);
        path.lineTo(100, 0);
        path.lineTo(100, 100);
        //path.lineTo(0, 50);
        path.computePath()



        const custom = createElement(650, 100, 100, 100, path);
        const square = createElement(50, 100, 200, 100, SquarePath.instance);
        const ellipse = createElement(350, 100, 200, 100, CirclePath.instance);

        stage.addEventListener(Stage2D.DRAW_BEGIN, () => {

            updateElement(square)
            updateElement(ellipse)
            updateElement(custom);
        })

    }



}