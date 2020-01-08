/**
 * Class that handles the first set of dialogue options after the original cutscene in the schoolparty.
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpGood extends GameScreen {

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
        keyboardListener: KeyboardListener,
        name: string
    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener, name);

        
       //Loads the backgroundImage into the memory
       this.backgroundImage = new Image();
       this.keesImage = new Image();
       this.youImage = new Image();
       this.dialogueBar = new Image()
       //Now, set the src to start loading the image
       this.backgroundImage.src = './assets/images/background/partybackground.jpg';
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
        this.ctx.drawImage(this.keesImage, -400, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.55, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Je zegt nee en wijst hem af", this.canvas.width / 2, this.canvas.height/2, 50);
        this.writeTextToCanvas(ctx, `${this.name}: Nee, ik ken je nog niet goed genoeg, dus ik wil je mijn snap niet geven`, this.canvas.width / 2, this.canvas.height-230);
        this.writeTextToCanvas(ctx, "Hij: Wat? Hoezo niet? We dansen toch al heel de avond, wat doe je stom?", this.canvas.width / 2, this.canvas.height - 190);
        this.writeTextToCanvas(ctx, `${this.name}: Ja sorry hoor, ik geef mijn snap gewoon niet aan mensen die ik niet ken, is dat een probleem ofzo?`, this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, "Hij: Ja, dat is een probleem ja, je kent me toch? Maar laat maar zitten, rotkind dat je bent.", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Ik snap dat je vriendloos bent.", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 30);
    }

   
}