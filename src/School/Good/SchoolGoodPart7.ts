/// <reference path='../../GameScreen.ts'/>
class SchoolGoodPart7 extends GameScreen {

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
        this.writeTextToCanvas(ctx, "De overweldigende druk van jouw keel en nek verdwijnt plots en Kees wankelt 2 stappen naar achter door jouw onverwachte reactie.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Kees bukt voorover en grijpt naar zijn borst, alsof alle lucht uit zijn longen was gedwongen.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Emily! Help! *Je rent hoestend en met wazig zicht naar Emily toe*`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Je ziet opeens helder, en ziet Emily met een telefoon-camera gericht in de richting waar je vandaan kwam.", this.canvas.width/2, this.canvas.height - 10);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width/2, this.canvas.height - 10);
    }

}