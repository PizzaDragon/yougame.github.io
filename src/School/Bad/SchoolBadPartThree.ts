/// <reference path='../../GameScreen.ts'/>
class SchoolBadPartThree extends GameScreen {

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

        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";

        this.youImage = new Image();
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
        //this.ctx.drawImage(this.emilyImage, -400, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height/1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `Je loopt door je school, overal zie je mensen lachen`, this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `${this.name}: Zucht... Dit is de stomste dag ooit`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Je hebt gym en niemand wil je in z'n team, je wordt compleet buitengesloten", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: Wat heb ik gedaan? Ik ben zo stom geweest....`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Misschien volgend jaar maar naar een andere school...`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);


    }

}