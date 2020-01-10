/**
 * Class StartScreen handles the StartScreen, it's attributes and it's methods
 */
/// <reference path='GameScreen.ts' />

class StartScreen extends GameScreen {

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
        //write the image functions
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)

        //write the text functions
        this.writeTextToCanvas(ctx, "You", this.canvas.width / 2, this.canvas.height / 2 - 40, 200);
        this.writeTextToCanvas(ctx, "DRUK OP ENTER OM TE SPELEN", this.canvas.width / 2, this.canvas.height - 50);
    }
}

