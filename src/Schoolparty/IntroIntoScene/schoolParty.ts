/**
 * Class SchoolParty handles the level of schoolparty
 * in which our main character goes to a party and encounters a boy
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolParty extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement
    private dialogueBar: HTMLImageElement;

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
        this.backgroundImage.src = './assets/images/background/partybackground.jpg'

        this.dialogueBar = new Image()
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png"
    }

    /**
     * method to initialize the screen
     */
    public listen(input: KeyboardListener) {
        if (input.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.shouldStartLevel = true
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height/1.25, this.canvas.width, this.canvas.height)
        this.writeTextToCanvas(ctx, "FEESTSCENE", this.canvas.width / 2, this.canvas.height/2, 140);
        this.writeTextToCanvas(ctx, 'Je bent op een feestje met Emily en wat mensen van school', this.canvas.width / 2, this.canvas.height - 100)
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 40);
        this.writeTextToCanvas(ctx, 'DRUK OP ESCAPE OM HET SPEL TE VERLATEN', 240, 20, 20)
    }
}