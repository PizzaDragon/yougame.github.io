/**
 * Class StartScreen handles the StartScreen, it's attributes and it's methods
 */
/// <reference path='GameScreen.ts' />

class StartScreen extends GameScreen {

    //adds basic attributes to class
    private shouldStartLevel: boolean = false;
    private characterImage: HTMLImageElement;
    private backgroundImage: HTMLImageElement;
    private phoneImage: HTMLImageElement;
    private snapchatImage: HTMLImageElement;
    private instagramImage: HTMLImageElement;



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

        //Loads the characterImage into the memory
        this.characterImage = new Image();
        //Now, set the src to start loading the image
        this.characterImage.src = "./assets/images/characters/karakter2.png"

        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/startscreen.jpg'

        //Loads the phoneImage into the memory
        this.phoneImage = new Image();
        // Now, set the src to start loading the image
        this.phoneImage.src = "./assets/images/attributes/Mobile.png"

        //loads an Snapchat image into the memory
        this.snapchatImage = new Image();
        // Now, set the src to start loading the image
        this.snapchatImage.src = "./assets/images/attributes/Snap.png"

        //Loads an Instagram image into the memory
        this.instagramImage = new Image();
        //Now, set the src to start loading the image
        this.instagramImage.src = './assets/images/attributes/Insta.png'




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
        //write the image functions
        // this.ctx.drawImage(this.characterImage, this.canvas.width / 2 - this.characterImage.width / 2, this.canvas.height / 2 - this.characterImage.height / 2);
        // this.ctx.drawImage(this.snapchatImage, 0, 0);
        // this.ctx.drawImage(this.instagramImage, 1500, 0);

        //write the text functions
        this.writeTextToCanvas(ctx, "You", 200, this.canvas.width / 2 , 500);
        this.writeTextToCanvas(ctx, "DRUK OP ENTER OM TE SPELEN", 30, this.canvas.width / 2, 700);
    }


}

