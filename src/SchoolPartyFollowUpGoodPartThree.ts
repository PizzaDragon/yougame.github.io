/**
 * Class that handles the first set of dialogue options after the original cutscene in the schoolparty.
 */
/// <reference path='GameScreen.ts'/>
class SchoolPartyFollowUpGoodPartThree extends GameScreen {

    //add the global attributes
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
        
        
        
        // Text methods in the canvas
        this.writeTextToCanvas(ctx, "Je loopt naar hem toe en probeert je excuses aan te bieden", 80, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: Hey sorry, het spijt me, ik reageerde te snel, wil je alsnog mijn snap?", 30, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Hij: hmmmm, weet ik niet hoor, even goed over nadenken...", 30, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: a komop, alsjeblieft", 30, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Hij: Oké dan, hier, voeg me maar toe", 30, this.canvas.width / 2, 360);
        
        
       
       
       
        // const backgroundImage = "./assets/images/background/SchoolPartyBackground.jpg";
        // this.loadImage(backgroundImage, this.drawBackgroundToScreen);
    }

    //  /**
    //  * constructs a function to handle the dialogue options
    //  * 
    //  * @param dialogueOptionOne option one which will go to the correct path
    //  * @param dialogueOptionTwo option two which will go to the neutral path
    //  * @param dialogueOptionthree option three which will go to the bad path

    //  */
    // // protected selectDialogueOptions(
    // //     dialogue: string,
    // //     dialogue: string,
    // //     dialogue: string,

    // // ) {
    // // }
}