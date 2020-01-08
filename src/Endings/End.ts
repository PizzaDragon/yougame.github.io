/// <reference path='../GameScreen.ts'/>
class End extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;

    //Add the constructor
    public constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        keyboardListener: KeyboardListener,
        name: string

    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener, name);



        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        // Now, set the src to start loading the image
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";

    }

    /**
     * method to initialize the screen
     */
    public listen(input: KeyboardListener) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "EINDE", this.canvas.width / 2, this.canvas.height - 400, 200);
        this.writeTextToCanvas(ctx, "Credits:", this.canvas.width / 2, this.canvas.height - 300, );
        this.writeTextToCanvas(ctx, "Calvin Hannewijk", this.canvas.width / 2, this.canvas.height - 260, );
        this.writeTextToCanvas(ctx, "Evan Verdoorn", this.canvas.width / 2, this.canvas.height - 220, );
        this.writeTextToCanvas(ctx, "Leslie Scherbeijn", this.canvas.width / 2, this.canvas.height - 180, );
        this.writeTextToCanvas(ctx, "Neo McNeese", this.canvas.width / 2, this.canvas.height - 140, );
        this.writeTextToCanvas(ctx, 'DRUK OP ESCAPE OM HET SPEL TE VERLATEN', 240, 20, 20)



    }

}