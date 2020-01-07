/// <reference path='../../GameScreen.ts'/>
class SchoolGoodDialogue1Part3 extends GameScreen {

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
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Jij: Misschien zijn we hier te ver mee gegaan.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Jij: We doen 100.000 dingen per dag, en geen enkel ding is productief.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Jij: We letten nooit op in de les, we doen weinig huiswerk, we leren nooit...", this.canvas.width / 2, this.canvas.height - 10);
        this.writeTextToCanvas(ctx, "Jij: Wij zijn slordig en onvoorzichtig geworden, en we doen niks anders dan bij ouderejaars hangen.", this.canvas.width/2, this.canvas.height + 30);
        this.writeTextToCanvas(ctx, "Emily: ...Ja. We zouden zeker een stuk meer aan school moeten doen. Laten we dan samen thuis studeren voor de toetsweek in plaats van naar een bar gaan.", this.canvas.width/2, this.canvas.height + 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width/2, this.canvas.height + 110);
    }

}