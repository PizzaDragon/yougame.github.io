/**
 * Class SchoolParty handles the level of schoolparty
 * in which our main character goes to a party and encounters a boy
 */
/// <reference path='GameScreen.ts'/>
class SchoolParty extends GameScreen {

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
        if (input.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.shouldStartLevel = true
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.writeTextToCanvas(ctx, "FEESTSCENE", 140, this.canvas.width/2, 300);
        this.writeTextToCanvas(ctx, 'Je bent op een feestje met Emily en wat mensen van school', 50, this.canvas.width/2, 460)
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", 30, this.canvas.width/2, 550);
        this.writeTextToCanvas(ctx, 'DRUK OP ESCAPE OM HET SPEL TE VERLATEN', 20, 240, 20)
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