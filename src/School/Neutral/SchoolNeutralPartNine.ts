/// <reference path='../../GameScreen.ts'/>
class SchoolNeutralPartNine extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private emilyImage: HTMLImageElement;
    private youImage: HTMLImageElement;
    private keesImage: HTMLImageElement;
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

        this.keesImage = new Image()
        this.keesImage.src = "./assets/images/characters/Kees1.png";











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
        this.ctx.drawImage(this.emilyImage, 100, 0,)
        this.ctx.drawImage(this.youImage, -300, 0,)
        this.ctx.drawImage(this.keesImage, -600, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height/1.50, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `${this.name}: Kees, wacht, ik en Emily gaan toch mee naar de bar!`, this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, "Emily: Oh ja joh?", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Kees: Geweldig! Ik zie je vanavond!", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Emily: Ik dacht dat je niet meer wilde?", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Ach joh, zo erg zal het toch niet zijn?`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }

}