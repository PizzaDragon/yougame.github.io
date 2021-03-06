/// <reference path='../../GameScreen.ts'/>
class SchoolGoodEnding2 extends GameScreen {

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
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Een week later wordt Kees steeds vaker door een groep onbekende derdeklassers gepest.", this.canvas.width/2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, "Het blijkt dat iedereen die het filmpje zag niet zo blij was met Kees z'n dreigementen.", this.canvas.width/2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Emily en jij hebben een dikke voldoende voor de toets en gaan sowieso over dit jaar naar Klas 2.", this.canvas.width/2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Iedereen die het filmpje gezien heeft, vinden jou en Emily heel dapper", this.canvas.width/2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "en al heel snel heb je vele goede vrienden", this.canvas.width/2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Je eindigt het jaar met goede cijfers, goede vrienden en zo trots als een pauw.", this.canvas.width/2, this.canvas.height - 10);
    }

}