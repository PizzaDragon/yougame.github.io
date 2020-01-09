/**
 * Class StartScreen handles the StartScreen, it's attributes and it's methods
 */
/// <reference path='GameScreen.ts' />

class NameScreen extends GameScreen {

    //adds basic attributes to class
    private backgroundImage: HTMLImageElement;
    private dialogueBar: HTMLImageElement;




    //add the constructor
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
        this.backgroundImage.src = './assets/images/background/startscreen2.jpg'

        this.dialogueBar = new Image()
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";

        //Now, set the src to start loading the image

    }

    public draw(ctx: CanvasRenderingContext2D) {
        //This is ugly but it gives an idea

        //write the image functions
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)
        this.writeTextToCanvas(ctx, `Je personage heet nu ${this.name}`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50)
        this.writeTextToCanvas(ctx, 'DRUK OP ESCAPE OM HET SPEL TE VERLATEN', 240, 20, 20)
    }
}
