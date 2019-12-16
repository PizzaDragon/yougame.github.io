/// <reference path='GameScreen.ts'/>
class SchoolPartySecondFollowUpGood extends GameScreen{
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
        this.writeTextToCanvas(ctx, 'Je zegt ja', 80, this.canvas.width/2, 360)
        this.writeTextToCanvas(ctx, "Emily: Oké, kom, dan gaan we wat drinken.", 50, this.canvas.width/2, 470);
        


    }

}