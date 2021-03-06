/// <reference path='../../GameScreen.ts'/>
class SchoolNeutralPartEight extends GameScreen {

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
        this.backgroundImage.src = "./assets/images/background/street.jpg";

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
        this.ctx.drawImage(this.emilyImage, -400, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height/1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emily: Kom je bij mij thuis leren? Het wordt wel eens tijd hahaha.", this.canvas.width / 2, this.canvas.height - 130,);
        this.writeTextToCanvas(ctx, "Ja, denk dat dat wel slim is. (toets 1)", this.canvas.width / 2, this.canvas.height - 90,);
        this.writeTextToCanvas(ctx, "Nee, ik ga liever in m'n eentje leren. (toets 2)", this.canvas.width / 2, this.canvas.height - 50,);
        this.writeTextToCanvas(ctx, "Je besluit terug naar Kees te gaan om te zeggen dat je toch naar de bar gaat. (toets 3)", this.canvas.width / 2, this.canvas.height - 10,);
       

    }

}