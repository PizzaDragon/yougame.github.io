/**
 * Class that handles if you select number two after the cutscene where you
 * choose to not give him your snapchat,
 * this class handles if the option is selected where you refuse to give him your snapchat
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpGoodPartFive extends GameScreen {

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
        this.backgroundImage.src = './assets/images/attributes/RARRI.png';
        this.momImage.src = "./assets/images/characters/moeder2.png";
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
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.9, this.canvas.width, this.canvas.height)


        // Text methods in the canvas
        this.writeTextToCanvas(ctx, `Mama: Hey ${this.name}, hoe was het feestje?`, this.canvas.width / 2, this.canvas.height - 330);
        this.writeTextToCanvas(ctx, `${this.name}: Meh was wel leuk, er was één zo'n gast bij die mij om mijn snapchat vroeg`, this.canvas.width / 2, this.canvas.height - 290);
        this.writeTextToCanvas(ctx, "Mama: Heb je het gegeven aan hem?", this.canvas.width / 2, this.canvas.height - 250);
        this.writeTextToCanvas(ctx, `${this.name}: Nee, heb hem niet gegeven, kende hem nog maar net en ik vertrouwde hem niet zo erg`, this.canvas.width / 2, this.canvas.height -210);
        this.writeTextToCanvas(ctx, "Mama: Ah joh, weet je, je kan hem altijd geven.",  this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Het maakt niet zo veel uit, als je zoiets aan iemand geeft, ",  this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "zolang je er maar verstandig mee omgaat.", this.canvas.width/2, this.canvas.height - 90)
        this.writeTextToCanvas(ctx, `${this.name}: Oh, serieus? Dat wist ik niet, goed om te weten`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height -10);


    }
}