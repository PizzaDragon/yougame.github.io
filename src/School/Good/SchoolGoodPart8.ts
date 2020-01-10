/// <reference path='../../GameScreen.ts'/>
class SchoolGoodPart8 extends GameScreen {

    //add the global attributes
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
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
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
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Het blijkt dat Kees ook Emily gezien heeft. Kees besluit het op een lopen te zetten en rent ervandoor.", this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `Emily: Oh mijn god ben je OK, ${this.name}?!`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `${this.name}: *KUCH KUCH* Ik... denk het wel. Hij probeerde me te wurgen!`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Emily: Ik weet wat je denkt. Normaal zou niemand ons geloven omdat hij zo populair is...", this.canvas.width/2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Maar ik heb alles opgenomen...", this.canvas.width/2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width/2, this.canvas.height - 10);
    }

}