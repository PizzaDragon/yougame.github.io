/// <reference path='../../GameScreen.ts'/>
class BarFollowUp extends GameScreen {

    //add the global attributes
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
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.keesImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/barbackground.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.keesImage.src = "./assets/images/characters/kees1.png";
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
        this.ctx.drawImage(this.youImage, -100, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.keesImage, 400, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Met een moeiteloze handbeweging, is de cola in de bitter-ruikende prullenbak geschonken.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Kees kijkt verbaasd naar zijn vrienden, waarna zijn hoofd weer terugdraait naar jouw richting met dezelfde verbazing.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: Kom, Emily. Zullen we samen lopen?`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Emily: Maar natuurlijk.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Jullie verlaten de bar en vertrekken samen naar huis.", this.canvas.width / 2, this.canvas.height - 10);

    }

}