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



        // Text methods in the canvas
        this.writeTextToCanvas(ctx, "Je besluit ervoor om je snapchat toch niet te geven, op dat punt stuurt je ma je een appje dat ze buiten staat", 80, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Je stapt in de auto", 80, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Mama: Hey, hoe was het feestje?", 30, this.canvas.width / 2, 440);
        this.writeTextToCanvas(ctx, "Jij: Meh was wel leuk, er was één zo'n gast bij die mij om mijn snapchat vroeg", 30, this.canvas.width / 2, 440);
        this.writeTextToCanvas(ctx, "Mama: Heb je hem gegeven aan hem?", 30, this.canvas.width / 2, 440);
        this.writeTextToCanvas(ctx, "Nee, heb hem niet gegeven, kende hem nog maar net en ik vertrouwde hem niet zo erg", 30, this.canvas.width / 2, 440);
        this.writeTextToCanvas(ctx, "Mama: A joh, weetje, je kan hem altijd geven, het maakt niet zo veel uit of je zoiets aan iemand geeft, zolang je er maar verstandig mee omgaat. ", 30, this.canvas.width / 2, 440);
        this.writeTextToCanvas(ctx, "Jij: O serieus? Dat wist ik niet, goed om te weten hahaha", 30, this.canvas.width / 2, 440);


    }
}