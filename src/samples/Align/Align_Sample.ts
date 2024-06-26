import { Align, Display2D, GlobalCompositeOperations, GradientColor, GradientFill, Group2D, RenderStack, Shape, SolidColor, SquarePath, Stage2D } from "xcanvas-ts";
import { Sample } from "./Sample";

export class Align_Sample extends Sample {

    protected async start(stage: Stage2D) {
        stage;

        stage.autoClear = false;

        const group = new Group2D();


        stage.appendChild(group);

        //group.width = stage.stageWidth;
        //group.height = stage.stageHeight;

        stage.x = stage.stageWidth * 0.5;
        stage.y = stage.stageHeight * 0.5;

        const shapeStack = new RenderStack();
        shapeStack.push(SquarePath.instance);
        //shapeStack.push(new SolidFill(new SolidColor(0, 255, 0)));

        const col1 = new SolidColor(255, 0, 0, 1);
        const col2 = new SolidColor(255, 0, 0, 0);

        const gradient = new GradientColor([col1, col2], [0.25, 0.75], false)
        const gradientFill = new GradientFill(gradient, false);

        shapeStack.push(gradientFill)


        const displays: Display2D[] = [];

        const positions: { x: number, y: number }[] = [];
        const motions: { x: number, y: number }[] = [];
        const forces: { vx: number, vy: number }[] = [];

        const size = 40;

        stage.debug = true


        group.compositeOperation = GlobalCompositeOperations.DIFFERENCE

        //let shape: Shape;
        let display: Display2D;
        let k = 0;
        for (let i = 0; i < stage.stageWidth; i += size * 2) {
            for (let j = 0; j < stage.stageHeight; j += size * 2) {
                forces[k] = { vx: 0, vy: 0 };
                positions[k] = { x: i, y: j };
                motions[k] = { x: i, y: j };
                //shapes[k++] = shape = new Shape(i, j, size, size, shapeStack)
                //box.stack(shape);

                displays[k++] = display = new Display2D(size, size, shapeStack);



                display.x = i;
                display.y = j;
                display.align(Align.CENTER);
                group.appendChild(display);

            }
        }


        let mx: number = 0// 99999999;
        let my: number = 0//99999999;
        const smooth = 0.05;
        const smooth2 = 0.01;


        group.align(Align.CENTER);



        let radius = 300;

        let green = 0;

        let motionTime = 0;
        let motionRadius = 0;

        group.scaleX = group.scaleY = 1.5;

        stage.addEventListener(Stage2D.DRAW_END, () => {

            const time = stage.frameId;



            radius -= (radius - 300) * 0.1;

            col1.b = Math.abs(Math.sin(time * 0.003)) * 255;
            //col2.r = col1.r;

            const pct = 0.2;//Math.min(1, green / 50);

            col1.g -= (col1.g - green) * pct;
            //col1.g *= 0.95;

            col2.r = col2.g = col2.b = col1.g;

            //col2.a -= (col2.a - alpha) * pct;
            //col2.g = col1.g;


            green *= 0.99;

            const m: DOMMatrix = group.currentTransform.inverse();
            const p = m.transformPoint(new DOMPoint(mx, my))





            motionTime *= 0.99;
            motionRadius *= 0.97;
            displays.forEach((s, id) => {
                //shapes.forEach((s, id) => {


                const dx = p.x - (s.x);
                const dy = p.y - (s.y);
                const a = Math.atan2(dy, dx) + Math.PI;
                const d = Math.sqrt(dx * dx + dy * dy);


                //const ratio = 0.0001 + d / radius;


                ///

                let px = positions[id].x + Math.cos(a + motionTime * 0.01) * motionRadius;
                let py = positions[id].y + Math.sin(a + motionTime * 0.01) * motionRadius;

                let vx = forces[id].vx;
                let vy = forces[id].vy;
                if (d < radius) {


                    vx = Math.cos(a) * (radius - d);
                    vy = Math.sin(a) * (radius - d);

                    px += vx;
                    py += vy;

                    s.rotation += (Math.abs(Math.sin(time * 0.1 * 6.2832)) * 12 * a);
                    s.scaleY = s.scaleX = 2 * (d / radius);

                }



                s.rotation *= 0.97;
                s.x -= (s.x - px) * 0.1;
                s.y -= (s.y - py) * 0.1;

                s.scaleX -= (s.scaleX - 1) * 0.1;
                s.scaleY = s.scaleX;

                motions[id].x -= (motions[id].x - px) * smooth;
                motions[id].y -= (motions[id].y - py) * smooth;

                s.x -= (s.x - motions[id].x) * smooth2;
                s.y -= (s.y - motions[id].y) * smooth2;


            })



        })


        let ox, oy;
        const rect = stage.outputCanvas.getBoundingClientRect();
        stage.outputCanvas.addEventListener("mousemove", (e) => {

            ox = mx;
            oy = my;

            mx = e.clientX - rect.x;
            my = e.clientY - rect.y;




            const dx = ox - mx;
            const dy = oy - my;
            const d = Math.sqrt(dx * dx + dy * dy);

            //col1.g = col2.g = Math.min(255, d);
            group.rotation += d * 0.1

            motionTime = d;
            motionRadius -= (motionRadius - 200) * 0.003;

            radius -= (radius - (radius - d)) * 0.2;
            green = d * 5;
            //alpha = 0.15;
            //col2.g -= (col2.g - d * 2.5) * 0.05;
            //col1.g -= (col1.g - col2.g) * 0.05;
            //col2.a -=  0.5;

        })




        //stage.align(Align.CENTER);


    }

}