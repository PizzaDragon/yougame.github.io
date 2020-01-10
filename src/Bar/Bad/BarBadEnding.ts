/// <reference path='../../GameScreen.ts'/>
class BarBadEnding extends GameScreen {

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
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Je loopt met Emily naar huis en begint je al snel flauw te voelen.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Emily: Gaat het wel met je?", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, `${this.name}: Ja, geef me even een minuutje. Loop maar alvast naar huis.`, this.canvas.width / 2, this.canvas.height - 10);
        this.writeTextToCanvas(ctx, "Emily twijfelt duidelijk, maar loopt alvast verder.", this.canvas.width / 2, this.canvas.height - 10);
        this.writeTextToCanvas(ctx, "Je voelt je nu heel moe en je lichaam verlamt zich. Je hoort haastige voetstappen naderen en een auto trapt op de remmen.", this.canvas.width / 2, this.canvas.height - 10);

    }

}