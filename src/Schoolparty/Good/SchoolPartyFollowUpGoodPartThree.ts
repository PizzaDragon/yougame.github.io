/**
 * Class that handles the first set of dialogue options after the original cutscene in the schoolparty.
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpGoodPartThree extends GameScreen {

    //add the global attributes
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
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/SchoolPartyBackground.jpg'


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
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)



        // Text methods in the canvas
        this.writeTextToCanvas(ctx, "Je loopt naar hem toe en probeert je excuses aan te bieden", 80, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: Hey sorry, het spijt me, ik reageerde te snel, wil je alsnog mijn snap?", 30, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Hij: hmmmm, weet ik niet hoor, even goed over nadenken...", 30, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: a komop, alsjeblieft", 30, this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Hij: Oké dan, hier, voeg me maar toe", 30, this.canvas.width / 2, 360);

    }
}