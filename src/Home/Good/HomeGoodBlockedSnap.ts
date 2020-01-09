/**
 * SchoolPartyFollowUpCutscene handles the follow up from the SchoolPartyFollowUpBad
 */
/// <reference path='../../GameScreen.ts'/>
class HomeGoodBlockedSnap extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private youCharacterImage: HTMLImageElement;
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
        this.backgroundImage.src =  "./assets/images/background/HomeBedroom2.jpg"




        //Loads the character image into the memory
        this.youCharacterImage = new Image();
        //Now, set the src to start loading the image
        this.youCharacterImage.src = './assets/images/characters/karakter2.png'

        this.dialogueBar = new Image()
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
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0 , this.canvas.height / 1.25, this.canvas.width, this.canvas.height)
        this.writeTextToCanvas(ctx, "Je besluit Kees te blokkeren.", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Je gaat nog even snappen met Emily.", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 30);

    }

}