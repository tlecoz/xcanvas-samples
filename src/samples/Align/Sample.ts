import { Browser, Stage2D } from "xcanvas-ts";


export class Sample {

    private static current: Sample = null;




    constructor() {
        console.clear();
    }

    public params: { name: string, min?: number, max?: number, object: any, propName?: string, round?: boolean }[] = [];
    protected destroyed: boolean = false;

    protected renderer: Stage2D;


    protected _started: boolean = false;


    protected static canvas2d: HTMLCanvasElement;

    public init(canvas: HTMLCanvasElement) {
        if (this._started) return;

        this._started = true;

        if (Sample.current) Sample.current.destroy();
        Sample.current = this;

        Browser.disableOffscreenCanvas = true;
        Browser.disableImageBitmap = true;

        if (!this.renderer) {
            this.renderer = new Stage2D(canvas.width, canvas.height, false);

            const nodes = canvas.parentNode.childNodes;
            while (nodes.length > 1) {
                canvas.parentNode.removeChild(nodes[nodes.length - 1]);
            }

            canvas.parentNode.appendChild(this.renderer.outputCanvas)
        }


        this.start(this.renderer);

        const animate = () => {
            //this.update();
            this.renderer.drawElements();
            requestAnimationFrame(animate);
        }
        animate();
    }

    public destroy(): void {
        if (this.destroyed) return;
        this.destroyed = true;
        this.renderer.clearElements();
        this.renderer.clear();
    }

    public update() {
        if (this.destroyed) return;
        this.renderer.drawElements();
    }

    protected async start(stage: Stage2D): Promise<void> {
        stage;
    }

} 