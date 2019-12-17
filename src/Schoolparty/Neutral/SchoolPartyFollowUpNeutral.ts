/**
 * SchoolPartyFollowUpBad handles the follow up from the schoolparty
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpNeutral extends GameScreen {

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
        keyboardListener: KeyboardListener

    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener);
        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/SchoolPartyBackground.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "http://www.zumbadancela.com/wp-content/themes/complexity-2/complexity-2/layout/images/style/bg/glossy-black.png";


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
        this.ctx.drawImage(this.emilyImage, -350, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)
        this.writeTextToCanvas(ctx, 'Je zegt niks', this.canvas.width / 2, 60, 80)
        this.writeTextToCanvas(ctx, "Emily: Hey, valt deze jongen je soms lastig?", this.canvas.width / 2, 630);
        this.writeTextToCanvas(ctx, "Ja, eigenlijk wel. [toets 1]", this.canvas.width / 2, 670);
        this.writeTextToCanvas(ctx, "Nee hoor. [toets 2]", this.canvas.width / 2, 710);
    }
}