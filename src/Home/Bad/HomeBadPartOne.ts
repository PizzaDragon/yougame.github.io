/// <reference path='../../GameScreen.ts'/>
class HomebadPartOne extends GameScreen {

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
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
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
       // this.ctx.drawImage(this.momImage, -400, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.40, this.canvas.width, this.canvas.height)


        // Text methods in the canvas
       
        this.writeTextToCanvas(ctx, `${this.name}: Onee, hij heeft een screenshot gemaakt. Wat nu?`, this.canvas.width / 2, this.canvas.height -170);
        this.writeTextToCanvas(ctx, `${this.name}: Moet ik dit aan mijn ouders vertellen?`, this.canvas.width / 2, this.canvas.height -130);
        this.writeTextToCanvas(ctx, `${this.name}: Of moet ik het laten gaan en afwachten?`, this.canvas.width / 2, this.canvas.height -90);
        this.writeTextToCanvas(ctx, "Vertel het je ouders (toets 1)", this.canvas.width / 2, this.canvas.height -50);
        this.writeTextToCanvas(ctx, "Vertel het je ouders niet (toets 2)", this.canvas.width / 2, this.canvas.height -10);


    }
}

