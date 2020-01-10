/// <reference path='../../GameScreen.ts'/>
class GoodEnd extends GameScreen {

    // //add the global attributes
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
        // Now, set the src to start loading the image
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";

        this.dialogueBar = new Image()
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";

        this.emilyImage = new Image()
        this.emilyImage.src = "./assets/images/characters/emily1.png";

        this.youImage = new Image()
        this.youImage.src = "./assets/images/characters/karakter2.png";










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
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height/1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je besluit om te gaan leren met Emily was heel goed.", this.canvas.width / 2, this.canvas.height - 210,);
        this.writeTextToCanvas(ctx, "Jullie hebt het jaar met dikke voldoendes gehaald en jullie band is nu sterker dan ooit te voren.", this.canvas.width / 2, this.canvas.height - 170,);
        this.writeTextToCanvas(ctx, "Jullie zijn redelijk populair geworden, zijn naar veel feestjes geweest en zijn in het algemeen heel sociaal geweest.", this.canvas.width / 2, this.canvas.height - 130,);
        this.writeTextToCanvas(ctx, "Van Kees heb je eigenlijk het hele jaar niks meer gehoord.", this.canvas.width / 2, this.canvas.height - 90,);
        this.writeTextToCanvas(ctx, "Op naar het tweede jaar.", this.canvas.width / 2, this.canvas.height - 50,);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN.", this.canvas.width / 2, this.canvas.height - 10,);
       

    }

}