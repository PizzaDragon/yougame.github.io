/// <reference path = '../../GameScreen.ts' />
class HomeBadFollowUpOne extends GameScreen {

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
        this.ctx.drawImage(this.keesImage, -350, 0)
        this.ctx.drawImage(this.youImage, 0, 0)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)

        //Loads text into the DOM
        this.writeTextToCanvas(ctx, "Je praat met Kees via snapchat", this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: Hey, vanavond was echt gezellig, ik had het echt naar mijn zin", this.canvas.width/2, this.canvas.height /2 + 20, 50)
        this.writeTextToCanvas(ctx, "Hij, ja inderdaad was leuk, je bent echt super aardig en knap ", this.canvas.width / 2, this.canvas.height - 230);
        this.writeTextToCanvas(ctx, "Jij: Knap ja? ", this.canvas.width / 2, this.canvas.height - 190);
        this.writeTextToCanvas(ctx, "Hij: Ja vond ik wel haha", this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, "Hij: Wat doe je eigenlijk?", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Jij: Beetje op bed zitten", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "Hij: Leuk, ik ook", this.canvas.width / 2, this.canvas.height - 30)
        this.writeTextToCanvas(ctx, "Druk op spatie om door te gaan", this.canvas.width / 2, this.canvas.height - 30)
       

    }
}