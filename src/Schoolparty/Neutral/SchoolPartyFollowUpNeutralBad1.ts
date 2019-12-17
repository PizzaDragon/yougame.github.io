/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpNeutralBad1 extends GameScreen {
    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;


    //Add the constructor
    public constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        keyboardListener: KeyboardListener

    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener);
        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/SchoolPartyBackground.jpg'


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
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.writeTextToCanvas(ctx, 'Nee hoor, ik sta al heel de avond met hem te praten.', this.canvas.width / 2, 360)
        this.writeTextToCanvas(ctx, 'Je geeft je Snap aan Kees.', this.canvas.width / 2, 400)
        this.writeTextToCanvas(ctx, 'Druk op spatie om verder te gaan', this.canvas.width / 2, 460)

      


    }

}

