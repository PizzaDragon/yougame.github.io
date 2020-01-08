/**
 * Class that handles if you select number two after the cutscene where you
 * choose to not give him your snapchat,
 * this class handles if the option is selected where you refuse to give him your snapchat
 */
/// <reference path='../../GameScreen.ts'/>
class HomeBadPartThree extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private momImage: HTMLImageElement;
    private youImage: HTMLImageElement;
    private dadImage: HTMLImageElement;
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
        this.dadImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/livingRoomBackground.jpg';
        this.momImage.src = "./assets/images/characters/moeder1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dadImage.src = './assets/images/characters/vader1.png';
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
        this.ctx.drawImage(this.dadImage, -550, 0)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)


        // Text methods in the canvas
        this.writeTextToCanvas(ctx, `Mama: Verdorie ${this.name}, dat is nu echt het stomste dat je kan doen.`, this.canvas.width / 2, this.canvas.height/2-120);
        this.writeTextToCanvas(ctx, `${this.name}: Ja, ik weet het, ik was stom maar ik weet niet hoe`, this.canvas.width / 2, this.canvas.height/2-80);
        this.writeTextToCanvas(ctx, "ik dit moet oplossen", this.canvas.width / 2, this.canvas.height/2 -40);
        this.writeTextToCanvas(ctx, `Mama: ${this.name}, ja. Lastig, wat denk jij lieverd?`, this.canvas.width / 2, this.canvas.height/2);
        this.writeTextToCanvas(ctx, "Papa: Ja, gewoon in zijn beloop laten denk ik. Meer kunnen we ook niet doen.",  this.canvas.width / 2, this.canvas.height/2+40);
        this.writeTextToCanvas(ctx, `Het zal allemaal wel goed komen neem ik aan.`, this.canvas.width/2, this.canvas.height/2+80)
        this.writeTextToCanvas(ctx, `${this.name}: Weet je het zeker? Is dat het slimste?`, this.canvas.width / 2, this.canvas.height/2+120);
        this.writeTextToCanvas(ctx, `Papa: Meer kunnen we niet doen toch?`, this.canvas.width / 2, this.canvas.height/2+160);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height -50);
       

    }
}