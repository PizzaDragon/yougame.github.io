/**
 * Class that handles the first set of dialogue options after the original cutscene in the schoolparty.
 */
/// <reference path='GameScreen.ts'/>
class SchoolPartyFirstDialogue extends GameScreen {
    
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
        this.writeTextToCanvas(ctx, 'Je staat te dansen met een jongen en hij gaat tegen je praten', 50, this.canvas.width/2, 360)
        this.writeTextToCanvas(ctx, "Hij leunt naar je toe en vraagt je snapchat", 50, this.canvas.width/2, 420);
        this.writeTextToCanvas(ctx, 'Je geeft je snap (toets 1)', 30, this.canvas.width/2, 460);
        this.writeTextToCanvas(ctx, 'Je zegt niks (toets 2)', 30, this.canvas.width/2, 510);
        this.writeTextToCanvas(ctx, 'Je geeft hem je snap niet en wijst hem af (toets 3)', 30, this.canvas.width/2, 550);
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