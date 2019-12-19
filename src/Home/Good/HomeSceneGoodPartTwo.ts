
/**
 * SchoolPartyFollowUpCutscene handles the follow up from the SchoolPartyFollowUpBad
 */
/// <reference path='../../GameScreen.ts'/>
class HomeSceneGoodPartTwo extends GameScreen {

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
        this.writeTextToCanvas(ctx, "Jij: Zo, nu ik nog over dat feestje nadenk, had ik wel de goede keuze gemaakt? Is Kees het wel waard?", this.canvas.width / 2, this.canvas.height - 120);
        this.writeTextToCanvas(ctx, "Je besluit Kees toe te voegen. (toets 1)", this.canvas.width / 2, this.canvas.height - 80);
        this.writeTextToCanvas(ctx, "Je besluit iets anders te doen. (toets 2)", this.canvas.width / 2, this.canvas.height - 40);
    }

}