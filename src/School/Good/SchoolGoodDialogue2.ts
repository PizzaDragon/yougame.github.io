/// <reference path='../../GameScreen.ts'/>
class SchoolGoodDialogue2 extends GameScreen {

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
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
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
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "De volgende dag doe je de toets. Jij en Emily hebben een goed gevoel erover.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `Emily: Zoals afgesproken, sturen we nu het filmpje naar iedereen.`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: Een deel van me hoopt dat Kees spijt heeft, maar ik denk niet dat hij dat heeft. Stuur het maar.`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Emily: Wil je de politie erbij betrekken?", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, `${this.name}: Betrek de politie erbij. (Toets 1) Laat het bij je klasgenoten en vrienden (Toets 2)`, this.canvas.width / 2, this.canvas.height - 10);
    }

}