import { Align, BitmapFill, BitmapPath, CirclePath, Display2D, Img, LineStyle, Path, Rectangle2D, RenderStack, SolidColor, SolidFill, SolidStroke, SquarePath, Stage2D } from "xcanvas-ts";
import { Sample } from "../Align/Sample";
import { PolygonPath } from "./PolygonPath";
import { ChristmasTreePath } from "./ChristmasTreePath";

export class GetBounds_Sample extends Sample {

    protected async start(stage: Stage2D) {


        const boundStack = new RenderStack([
            SquarePath.instance,
            new SolidStroke(new SolidColor(127, 0, 0), new LineStyle(3))
        ])



        const createElement = (x: number, y: number, w: number, h: number, path: Path | RenderStack): { display: Display2D, bound: Display2D } => {
            //
            const bound = stage.appendChild(new Display2D(0.1, 0.1, boundStack));
            bound.align(Align.CENTER);

            const display = stage.appendChild(new Display2D(w, h));
            display.stack(path);

            if (path instanceof Path) display.stack(new SolidFill(new SolidColor(127, 127, 127)));

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





        const shapes = [];
        let nb = 0;

        shapes[nb++] = createElement(50, 100, 200, 100, SquarePath.instance);
        shapes[nb++] = createElement(550, 100, 200, 100, CirclePath.instance);

        shapes[nb++] = createElement(300, 60, 200, 200, new PolygonPath(5));
        shapes[nb++] = createElement(100, 400, 300, 300, ChristmasTreePath.instance);
        //shapes[nb++] = createElement(350, 300, 200, 200, new PolygonPath(8));



        const img = new Img("./assets/homer.png");

        img.addEventListener(Img.IMAGE_LOADED, () => {

            shapes[nb++] = createElement(450, 400, 300, 300, new RenderStack([
                new BitmapPath(img),
                new BitmapFill(img, false),
            ]));

        })



        stage.addEventListener(Stage2D.DRAW_BEGIN, () => {

            shapes.forEach((s) => updateElement(s));
        })

    }



}