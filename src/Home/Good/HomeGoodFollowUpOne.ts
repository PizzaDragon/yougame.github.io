/// <reference path = '../../GameScreen.ts' />
class HomeGoodFollowUpOne extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private keesImage: HTMLImageElement;
    private youImage: HTMLImageElement;
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
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
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
        //Loads images into the DOM
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        // this.ctx.drawImage(this.keesImage, -350, 0)
        this.ctx.drawImage(this.youImage, 0, 0)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Je bent op je kamer en je start snapchat op", this.canvas.width / 2, 360);
        // this.writeTextToCanvas(ctx, "Jij: Nee, ik ken je nog niet goed genoeg, dus ik wil je mijn snap niet geven", this.canvas.width / 2, 470);
        // this.writeTextToCanvas(ctx, "Hij: Wat? Hoezo niet? We dansen toch al heel de avond, wat doe je stom?", this.canvas.width / 2, 500);
        // this.writeTextToCanvas(ctx, "Jij: Ja sorry hoor, ik geef mijn snap gewoon niet aan mensen die ik niet ken, is dat een probleem ofzo?", this.canvas.width / 2, 530);
        // this.writeTextToCanvas(ctx, "Hij: Ja, dat is een probleem ja, je kent me toch? Maar laat maar zitten, rotkind dat je bent. Ik snap dat je vriendloos bent.", this.canvas.width / 2, 560);

    }
}