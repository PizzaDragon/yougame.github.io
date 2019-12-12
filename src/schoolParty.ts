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
        this.writeTextToCanvas(ctx, "PARTYSCENE", 140, 500, 200);
        this.writeTextToCanvas(ctx, 'Je bent op een feestje met je vrienden en wat mensen van school', 50, 800, 360)
        this.writeTextToCanvas(ctx, "PRESS SPACE TO CONTINUE", 30, 500, 400);
        this.writeTextToCanvas(ctx, 'PRESS ESC TO EXIT', 30, 500, 450)
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