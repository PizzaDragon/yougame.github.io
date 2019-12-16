/**
 * SchoolPartySnapCutscene handles the follow up from the SchoolPartyFollowUpBad's dialogue option where you give him your snap
 */
/// <reference path='GameScreen.ts'/>
class SchoolPartySnapCutscene extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;

    


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
        this.backgroundImage.src =  "./assets/images/attributes/PersonHoldingPhoneInHandSnapChatNotification.png"



      



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
        this.ctx.drawImage(this.backgroundImage, 0, 0);
        this.writeTextToCanvas(ctx, "Hij voegt je toe.", 50, this.canvas.width / 2, 200);
        

    }

}