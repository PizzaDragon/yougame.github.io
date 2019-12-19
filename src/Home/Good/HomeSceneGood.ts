/**
 * SchoolPartyFollowUpCutscene handles the follow up from the SchoolPartyFollowUpBad
 */
/// <reference path='../../GameScreen.ts'/>
class HomeSceneGood extends GameScreen {

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
        keyboardListener: KeyboardListener


    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener);



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
        this.writeTextToCanvas(ctx, "Jij: Eindelijk thuis... ", this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, "Jij: Heb ik al mijn huiswerk eigenlijk al af? Oh, wacht. Dat was al klaar gisteren.", this.canvas.width/2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Jij: Ik kan beter wat voor mezelf doen, ik verveel me dood. Snapchat tijd!", this.canvas.width/2, this.canvas.height - 70);        
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width/2, this.canvas.height -30);
    }

}