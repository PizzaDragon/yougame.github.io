/// <reference path='../../GameScreen.ts'/>
class BarBadEndingPart2 extends GameScreen {

    //add the global attributes
    private backgroundImage: HTMLImageElement;
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
        this.dialogueBar = new Image()
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/darkbedroom.jpg';
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png"
    }

    public draw(ctx: CanvasRenderingContext2D) {
        //Loads images into the DOM
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.35, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Je wordt wakker in een pikzwarte ruimte.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Terwijl je ogen aan de eindeloze duisternis wennen,", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "heb je snel door dat je vastgebonden zit aan een bed.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Uh oh.`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);

    }

}