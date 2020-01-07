/// <reference path='../../GameScreen.ts'/>
class SchoolNeutralPartSix extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private emilyImage: HTMLImageElement;
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
        // Now, set the src to start loading the image
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";

        this.dialogueBar = new Image()
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";

        this.emilyImage = new Image()
        this.emilyImage.src = "./assets/images/characters/emily1.png";

        this.youImage = new Image()
        this.youImage.src = "./assets/images/characters/karakter2.png";










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
        this.writeTextToCanvas(ctx, "Jij en Emily komen Kees tegen op straat.", this.canvas.width / 2, this.canvas.height - 130,);
        this.writeTextToCanvas(ctx, "Kees: Hey karakter, ik heb je niet meer gezien op school vandaag, maar heb je zin om vanvond mee naar de bar te gaan?", this.canvas.width / 2, this.canvas.height - 130,);
        this.writeTextToCanvas(ctx, "Nee, ik ga liever niet naar de bar. (toets 1)", this.canvas.width / 2, this.canvas.height - 10);
        this.writeTextToCanvas(ctx, "Je zegt niks. (toets 2)", this.canvas.width / 2, this.canvas.height - 10);
        this.writeTextToCanvas(ctx, "Uhm, ja hoor. (toets 3)", this.canvas.width / 2, this.canvas.height - 10);


    }

}