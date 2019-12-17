/**
 * Class StartScreen handles the StartScreen, it's attributes and it's methods
 */
/// <reference path='GameScreen.ts' />

class StartScreen extends GameScreen {

    //adds basic attributes to class
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
   



    //add the constructor
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
        this.backgroundImage.src = './assets/images/background/startscreen2.jpg'
    }

    /**
    * method to initialize the screen
    */
    public listen(input: KeyboardListener) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true
        }
    }
    /**
     * method to handle detect if the game should switch screens.
     */
    public adjust(game: Game) {
        if (this.shouldStartLevel) {
            game.switchScreen();
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        //This is ugly but it gives an idea

        //write the image functions
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)

        //write the text functions
        this.writeTextToCanvas(ctx, "You", this.canvas.width / 2 , 500, 200);
        this.writeTextToCanvas(ctx, "DRUK OP ENTER OM TE SPELEN", this.canvas.width / 2, 700, 30);
    }


}

