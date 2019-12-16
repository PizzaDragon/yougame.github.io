/**
 * HomeSceneGood handles the follow up from the good option in schoolparty
 */
/// <reference path='GameScreen.ts'/>
class HomeSceneGood extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private keesCharacterImage: HTMLImageElement;
    private youCharacterImage: HTMLImageElement;




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
        //This handles the images in the screen.
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.keesCharacterImage, 500, 500);
        this.ctx.drawImage(this.youCharacterImage, 200, 500);

        //This handles the dialogue in the screen
        this.writeTextToCanvas(ctx, "Je kijkt raar op, ik, een loser? Heb ik wel de goede keuze gemaakt?", this.canvas.width / 2, 200);
        this.writeTextToCanvas(ctx, "Ga naar hem, bied je excuses aan en geef je snapchat (toets 1) ", this.canvas.width / 2, 400);
        this.writeTextToCanvas(ctx, "Nee, ik vertrouw hem echt niet (toets 2). ", this.canvas.width / 2, 430);
        this.writeTextToCanvas(ctx, "Jij: Oke, ik geef hem mijn snap, als ik hem niet mag verwijder ik hem gewoon (toets 3)", this.canvas.width / 2, 460);



    }

}