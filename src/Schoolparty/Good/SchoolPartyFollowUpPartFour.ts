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
        keyboardListener: KeyboardListener

    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener);
        
         //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        this.momImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/SchoolPartyBackground.jpg';
        this.momImage.src = "./assets/images/characters/moeder1.png";
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
        //Image methods into the DOM
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.momImage, -350, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)


        // Text methods in the canvas
        this.writeTextToCanvas(ctx, "Je besluit ervoor om je snapchat toch niet te geven, op dat punt stuurt je ma je een appje dat ze buiten staat", this.canvas.width / 2, 200);
        this.writeTextToCanvas(ctx, "Je stapt in de auto", this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Mama: Hey, hoe was het feestje?", this.canvas.width / 2, 440);
        this.writeTextToCanvas(ctx, "Jij: Meh was wel leuk, er was één zo'n gast bij die mij om mijn snapchat vroeg", this.canvas.width / 2, 470);
        this.writeTextToCanvas(ctx, "Mama: Heb je hem gegeven aan hem?", this.canvas.width / 2, 500);
        this.writeTextToCanvas(ctx, "Nee, heb hem niet gegeven, kende hem nog maar net en ik vertrouwde hem niet zo erg", this.canvas.width / 2, 530);
        this.writeTextToCanvas(ctx, "Mama: A joh, weetje, je kan hem altijd geven, het maakt niet zo veel uit of je zoiets aan iemand geeft, zolang je er maar verstandig mee omgaat. ",  this.canvas.width / 2, 560);
        this.writeTextToCanvas(ctx, "Jij: O serieus? Dat wist ik niet, goed om te weten hahaha", this.canvas.width / 2, 590);


    }
}