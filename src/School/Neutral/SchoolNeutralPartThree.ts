/// <reference path='../../GameScreen.ts'/>
class SchoolNeutralPartThree extends GameScreen {

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
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";

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
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height/1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emliy: Wil je vanavond anders met me mee naar de bar? Ik ga met een paar oudere jaars.", this.canvas.width / 2, this.canvas.height - 120,);
        this.writeTextToCanvas(ctx, "Ja hoor, lijkt me leuk. [toets 1]", this.canvas.width / 2, this.canvas.height - 80,);
        this.writeTextToCanvas(ctx, "Is dat wel zo'n slim idee?. [toets 2]", this.canvas.width / 2, this.canvas.height - 80,);
        this.writeTextToCanvas(ctx, "Nee, eigenlijk liever niet. [toets 3]", this.canvas.width / 2, this.canvas.height - 40);


    }

}