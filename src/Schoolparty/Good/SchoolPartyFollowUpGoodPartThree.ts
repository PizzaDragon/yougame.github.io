/**
 * Class that handles the first set of dialogue options after the original cutscene in the schoolparty.
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpGoodPartThree extends GameScreen {

    //add the global attributes
    private shouldStartLevel: boolean = false;
    private readonly backgroundImage: HTMLImageElement;
    private readonly keesCharacterImage: HTMLImageElement;
    private readonly youCharacterImage: HTMLImageElement;



    //Add the constructor
    public constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        keyboardListener: KeyboardListener

    ) {
        super(game, canvas, ctx, img, keyboardListener)
        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        // Now, set the src to start loading the image
        this.backgroundImage.src = "./assets/images/background/SchoolPartyBackground.jpg"

        //Loads the character image into the memory
        this.keesCharacterImage = new Image();
        //Now, set the src to start loading the image
        this.keesCharacterImage.src = './assets/images/characters/Kees1.png'

        //Loads the character image into the memory
        this.youCharacterImage = new Image();
        //Now, set the src to start loading the image
        this.youCharacterImage.src = './assets/images/characters/karakter2.png'


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
        //Images into the DOM
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.keesCharacterImage, 500, 500);
        this.ctx.drawImage(this.youCharacterImage, 200, 500);


        // Text methods in the canvas
        this.writeTextToCanvas(ctx, "Je loopt naar hem toe en probeert je excuses aan te bieden", this.canvas.width / 2, 360);
        this.writeTextToCanvas(ctx, "Jij: Hey sorry, het spijt me, ik reageerde te snel, wil je alsnog mijn snap?",  this.canvas.width / 2, 390);
        this.writeTextToCanvas(ctx, "Hij: hmmmm, weet ik niet hoor, even goed over nadenken...",  this.canvas.width / 2, 420);
        this.writeTextToCanvas(ctx, "Jij: a komop, alsjeblieft",  this.canvas.width / 2, 450);
        this.writeTextToCanvas(ctx, "Hij: Oké dan, hier, voeg me maar toe",  this.canvas.width / 2, 480);

    }
}