/// <reference path='../../GameScreen.ts'/>
class SchoolNeutralPartOne extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private moederCharacterImage: HTMLImageElement;
    private youCharacterImage: HTMLImageElement;
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
        // Now, set the src to start loading the image
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg"

        this.dialogueBar = new Image()
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
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je komt aan op school en ziet Kees lopen.", this.canvas.width / 2, this.canvas.height - 450, 30);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 400);


    }

}