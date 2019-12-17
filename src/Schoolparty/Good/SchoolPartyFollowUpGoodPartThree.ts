/**
 * Class that handles the first set of dialogue options after the original cutscene in the schoolparty.
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpGoodPartThree extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private keesImage: HTMLImageElement;
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
        super(game, canvas, ctx, img, keyboardListener)
       //Loads the backgroundImage into the memory
       this.backgroundImage = new Image();
       this.keesImage = new Image();
       this.youImage = new Image();
       this.dialogueBar = new Image()
       //Now, set the src to start loading the image
       this.backgroundImage.src = './assets/images/background/SchoolPartyBackground.jpg';
       this.keesImage.src = "./assets/images/characters/kees1.png";
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
        //Images into the DOM
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.keesImage, -350, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)


        // Text methods in the canvas
        this.writeTextToCanvas(ctx, "Je loopt naar hem toe en probeert je excuses aan te bieden", this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: Hey sorry, het spijt me, ik reageerde te snel, wil je alsnog mijn snap?",  this.canvas.width / 2, 390);
        this.writeTextToCanvas(ctx, "Hij: hmmmm, weet ik niet hoor, even goed over nadenken...",  this.canvas.width / 2, 420);
        this.writeTextToCanvas(ctx, "Jij: a komop, alsjeblieft",  this.canvas.width / 2, 450);
        this.writeTextToCanvas(ctx, "Hij: Oké dan, hier, voeg me maar toe",  this.canvas.width / 2, 480);

    }
}