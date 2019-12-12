/**
 * SchoolPartyFollowUpBad handles the follow up from the schoolparty
 */
/// <reference path='GameScreen.ts'/>
class SchoolPartyFollowUpBad extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;


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
        this.writeTextToCanvas(ctx, "SCENE ONE", 140, 500, 200);
        this.writeTextToCanvas(ctx, "PRESS ENTER TO CONTINUE", 30, 500, 400);
        const backgroundImage = "./assets/images/background/SchoolPartyBackground.jpg";
        this.loadImage(backgroundImage, this.drawBackgroundToScreen);
    }

}