/**
 * Class that handles if you select number two after the cutscene where you
 * choose to not give him your snapchat,
 * this class handles if the option is selected where you refuse to give him your snapchat
 */
/// <reference path='../../GameScreen.ts'/>
class HomeBadPartTwo extends GameScreen {

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
        this.backgroundImage.src = './assets/images/background/livingRoomBackground.jpg';
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
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.7, this.canvas.width, this.canvas.height)


        // Text methods in the canvas
        this.writeTextToCanvas(ctx, `Mama: Hey ${this.name}, hoe gaat het?`, this.canvas.width / 2, this.canvas.height - 290);
        this.writeTextToCanvas(ctx, `${this.name}: Niet zo goed eigenlijk, er is wat gebeurt`, this.canvas.width / 2, this.canvas.height -250);
        this.writeTextToCanvas(ctx, "Mama: Wat dan?", this.canvas.width / 2, this.canvas.height -210);
        this.writeTextToCanvas(ctx, `${this.name}: Nou... Ik was via snapchat aan het praten met een jongen..`, this.canvas.width / 2, this.canvas.height -170);
        this.writeTextToCanvas(ctx, "Mama: En toen?",  this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: Nou, hij vroeg om naaktfoto's en ik gaf ze. Hij zou ze niet screenshotten`, this.canvas.width/2, this.canvas.height - 90)
        this.writeTextToCanvas(ctx, `${this.name}: Maar dat deed hij wel`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height -10);


    }
}