/**
 * SchoolPartySnapCutscene handles the follow up from the SchoolPartyFollowUpBad's dialogue option where you give him your snap
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpSnapCutscene extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
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
        this.backgroundImage.src =  "./assets/images/attributes/SnapchatToegevoegd.png"

        this.dialogueBar = new Image()
        this.dialogueBar.src = "http://www.zumbadancela.com/wp-content/themes/complexity-2/complexity-2/layout/images/style/bg/glossy-black.png";




      



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
        this.writeTextToCanvas(ctx, "Hij voegt je toe.", this.canvas.width / 2, this.canvas.height -90);
        this.writeTextToCanvas(ctx, "Druk op spatie om verder te gaan", this.canvas.width / 2, this.canvas.height -50);
        

    }

}