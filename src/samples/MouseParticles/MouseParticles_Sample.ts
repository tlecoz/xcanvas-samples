import { Align, Display2D, GradientColor, GradientFill, Group2D, RenderStack, SolidColor, SquarePath, Stage2D } from "xcanvas-ts";
import { Sample } from "../Align/Sample";


export class MouseParticles_Sample extends Sample {

    protected async start(stage: Stage2D) {

        stage.autoClear = false;
        stage.x = stage.stageWidth * 0.5;
        stage.y = stage.stageHeight * 0.5;


        const group = new Group2D();
        stage.appendChild(group);

        const shapeStack = new RenderStack();
        shapeStack.push(SquarePath.instance);

        const col1 = new SolidColor(255, 0, 0, 1);
        const col2 = new SolidColor(255, 0, 0, 0);

        const gradient = new GradientColor([col1, col2], [0.25, 0.75], false)
        const gradientFill = new GradientFill(gradient);
        shapeStack.push(gradientFill)


        const displays: Display2D[] = [];
        const positions: { x: number, y: number }[] = [];
        const motions: { x: number, y: number }[] = [];
        const forces: { vx: number, vy: number }[] = [];

        const size = 40;
        let display: Display2D;
        let k = 0;
        for (let i = 0; i < stage.stageWidth; i += size) {
            for (let j = 0; j < stage.stageHeight; j += size) {
                forces[k] = { vx: 0, vy: 0 };
                positions[k] = { x: size * 0.5 + i, y: size * 0.5 + j };
                motions[k] = { x: i, y: j };
                displays[k++] = display = new Display2D(size, size, shapeStack);
                display.x = size * 0.5 + i;
                display.y = size * 0.5 + j;
                display.align(Align.CENTER);
                group.appendChild(display);
            }
        }


        let mx: number = stage.stageWidth * 0.5;
        let my: number = stage.stageHeight * 0.5;
        const smooth = 0.05;
        const smooth2 = 0.01;


        let scale = 1.5;
        group.align(Align.CENTER);
        group.scaleX = group.scaleY = scale;


        let radius = 500;
        let green = 0;
        let motionTime = 0;
        let motionRadius = 0;
        let rota = 0;

        stage.addEventListener(Stage2D.DRAW_END, () => {

            const time = stage.frameId;
            scale -= (scale - 1.5) * 0.03;
            rota *= 0.97;
            group.rotation += rota + 0.1;
            radius -= (radius - 300) * 0.1;
            col1.b = Math.abs(Math.sin(time * 0.003)) * 255;

            const pct = 0.2;
            col1.g -= (col1.g - green) * pct;
            col2.r = col2.g = col2.b = col1.g;
            green *= 0.99;

            if (!group.currentTransform) return

            const m: DOMMatrix = group.currentTransform.inverse();
            const p = m.transformPoint(new DOMPoint(mx, my))

            motionTime *= 0.99;
            motionRadius *= 0.97;

            displays.forEach((s, id) => {

                const dx = p.x - (s.x);
                const dy = p.y - (s.y);
                const a = Math.atan2(dy, dx) + Math.PI;
                const d = Math.sqrt(dx * dx + dy * dy);

                let px = positions[id].x + Math.cos(a + motionTime * 0.1) * motionRadius;
                let py = positions[id].y + Math.sin(a + motionTime * 0.1) * motionRadius;

                let vx = forces[id].vx;
                let vy = forces[id].vy;
                if (d < radius) {

                    vx = Math.cos(a) * (radius - d);
                    vy = Math.sin(a) * (radius - d);

                    px += vx;
                    py += vy;

                    s.scaleY = s.scaleX = 2 * Math.sin((d / radius) * Math.PI / 2 - Math.PI / 2);

                } else {

                    s.x += Math.cos(time * 0.005 + (id * 0.1)) * id * 0.1;
                    s.y += Math.sin(time * 0.005 + (id * 0.1)) * id * 0.1;
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

            group.rotation += d * 0.2
            scale = 1.5 + d * 0.01;
            rota = d * 0.2;
            motionTime = d / 2;
            motionRadius -= (motionRadius - 200) * 0.003;
            radius -= (radius - (radius - d)) * 0.2;
            green = d * 5;
        })
    }
}