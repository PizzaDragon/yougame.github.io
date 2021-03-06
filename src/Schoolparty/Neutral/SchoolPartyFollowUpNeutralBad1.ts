/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpNeutralBad1 extends GameScreen {
    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private emilyImage: HTMLImageElement;
    private youImage: HTMLImageElement;
    private dialogueBar: HTMLImageElement;


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
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()

        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/partybackground.jpg'
        this.emilyImage.src = "./assets/images/characters/emily1.png"
        this.youImage.src = "./assets/images/characters/karakter2.png"
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png"


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
        this.ctx.drawImage(this.emilyImage, -400, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)
        this.writeTextToCanvas(ctx, 'Nee hoor, ik sta al heel de avond met hem te praten.', this.canvas.width / 2, this.canvas.height - 110)
        this.writeTextToCanvas(ctx, 'Je geeft je Snap aan Kees.', this.canvas.width / 2, this.canvas.height - 70)
        this.writeTextToCanvas(ctx, 'DRUK OP SPATIE OM VERDER TE GAAN', this.canvas.width / 2, this.canvas.height - 30)

      


    }

}

