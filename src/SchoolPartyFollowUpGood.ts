/**
 * Class that handles the first set of dialogue options after the original cutscene in the schoolparty.
 */
/// <reference path='GameScreen.ts'/>
class SchoolPartyFollowUpGood extends GameScreen {

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
        // if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))
        this.writeTextToCanvas(ctx, "Je zegt nee en wijst hem af", 80, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: Nee, ik ken je nog niet goed genoeg, dus ik wil je mijn snap niet geven", 30, this.canvas.width / 2, 470);
        this.writeTextToCanvas(ctx, "Hij: Wat? Hoezo niet? We dansen toch al heel de avond, wat doe je stom?", 30, this.canvas.width / 2, 500);
        this.writeTextToCanvas(ctx, "Jij: Ja sorry hoor, ik geef mijn snap gewoon niet aan mensen die ik niet ken, is dat een probleem ofzo?", 30, this.canvas.width / 2, 530);
        this.writeTextToCanvas(ctx, "Hij: Ja, dat is een probleem ja, je kent me toch? Maar laat maar zitten, rotkind dat je bent. Ik snap dat je vriendloos bent.", 30, this.canvas.width / 2, 560);
       
       
       
       
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