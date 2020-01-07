/**
 * Class that handles if you select number two after the cutscene where you
 * choose to not give him your snapchat,
 * this class handles if the option is selected where you refuse to give him your snapchat
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpGoodPartFour extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private momImage: HTMLImageElement;
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
        this.momImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.momImage.src = "./assets/images/characters/moeder1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
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
        //Image methods into the DOM
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.momImage, -400, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)


        // Text methods in the canvas
        this.writeTextToCanvas(ctx, "Je besluit ervoor om je snapchat toch niet te geven,", this.canvas.width / 2, this.canvas.height/2 -60, 50);
        this.writeTextToCanvas(ctx, "op dat punt stuurt je ma je een appje dat ze buiten staat", this.canvas.width / 2, this.canvas.height/2, 50);
        this.writeTextToCanvas(ctx, "Je stapt in de auto", this.canvas.width / 2, this.canvas.height/2 +60, 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width/2, this.canvas.height-60)
        
    }
}