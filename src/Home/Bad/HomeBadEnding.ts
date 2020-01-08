/// <reference path='../../GameScreen.ts'/>
class HomeBadEnding extends GameScreen {

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
        this.ctx.drawImage(this.youImage, 0, 0)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.40, this.canvas.width, this.canvas.height)


        // Text methods in the canvas

        this.writeTextToCanvas(ctx, `${this.name}: Nou, hopen dat dat goed komt.`, this.canvas.width / 2, this.canvas.height - 180);
        this.writeTextToCanvas(ctx, `Laat ik maar gaan slapen, morgen heb ik een lange dag school`, this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, "Druk op spatie om verder te gaan", this.canvas.width / 2, this.canvas.height - 50);


    }
}

