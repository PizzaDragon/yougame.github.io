/// <reference path='../../GameScreen.ts'/>
class HomeNeutralFollowUpOne extends GameScreen {

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
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener);


        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
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
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.35, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Je ziet dat Kees je toegevoegd heeft op Snapchat.", this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, "Oh, dat is Kees van het feestje, laat ik hem ook toevoegen. (Toets 1)", this.canvas.width/2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Je besluit de melding te negeren. (Toets 2)", this.canvas.width/2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "Je besluit zijn Snapchat te blokkeren. (Toets 3)", this.canvas.width/2, this.canvas.height - 30);
    }

}