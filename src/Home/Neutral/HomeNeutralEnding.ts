/// <reference path='../../GameScreen.ts'/>
class HomeNeutralEnding extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private snapImage: HTMLImageElement;
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
        this.snapImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.snapImage.src = "./assets/images/attributes/snap4.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png"
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
        //Loads images into the DOM
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height/1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Nadat je heel de avond met Kees gesnapt hebt, besluit je te gaan slapen.", this.canvas.width/2, this.canvas.height -110);
        this.writeTextToCanvas(ctx, "Je spreekt hem morgen op school wel weer.", this.canvas.width/2, this.canvas.height -70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width/2, this.canvas.height -30);

       
        
    }

}