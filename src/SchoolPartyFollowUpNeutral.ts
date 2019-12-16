/**
 * SchoolPartyFollowUpBad handles the follow up from the schoolparty
 */
/// <reference path='GameScreen.ts'/>
class SchoolPartyFollowUpNeutral extends GameScreen {

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
<<<<<<< HEAD
        this.writeTextToCanvas(ctx, 'Je zegt niks', this.canvas.width/2, 360, 80)
        this.writeTextToCanvas(ctx, "Emily: Hey, valt deze jongen je soms lastig? Kom, dan gaan we wat te drinken halen.", this.canvas.width/2, 470);
=======
        this.writeTextToCanvas(ctx, 'Je zegt niks', 80, this.canvas.width/2, 100)
        this.writeTextToCanvas(ctx, "Emily: Hey, valt deze jongen je soms lastig?", 50, this.canvas.width/2, 200);
        this.writeTextToCanvas(ctx, "Ja, eigenlijk wel. [toets 1]", 30, this.canvas.width/2, 300);
        this.writeTextToCanvas(ctx, "Nee hoor. [toets 2]", 30, this.canvas.width/2, 400);


>>>>>>> 236ed2c574d045bacb8827e5cf7c301fcb24590a
    }
}