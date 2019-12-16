/**
 * SchoolPartyFollowUpBad handles the follow up from the schoolparty
 */
/// <reference path='GameScreen.ts'/>
class SchoolPartyFollowUpBad extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private characterImage: HTMLImageElement;
    


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
        this.backgroundImage.src =  "./assets/images/background/SchoolPartyBackground.jpg"

        //loads a character image into the memory
        this.characterImage = new Image();
        // Now, set the src to start loading the image
        this.characterImage.src =  "./assets/images/characters/Kees1.png"



      



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
        this.ctx.drawImage(this.backgroundImage, 0, 0);
        this.ctx.drawImage(this.characterImage, 500, 500)
        this.writeTextToCanvas(ctx, "Je kijkt naar hem, geeft hem een glimlach en geeft hem je snapchat.", 50, this.canvas.width / 2, 200);
        this.writeTextToCanvas(ctx, "Jij: Je mag hem alleen hebben als je belooft dat je niet zal lachen ", 30, this.canvas.width / 2, 400);
        this.writeTextToCanvas(ctx, "Hij: Ja oke, ik beloof dat ik niet zal lachen. ", 30, this.canvas.width / 2, 430);
        this.writeTextToCanvas(ctx, "Jij: Oke vooruit dan maar, alsjeblieft", 30, this.canvas.width / 2, 460);
        this.writeTextToCanvas(ctx, "Jij: Hey maar mijn moeder is er dus ik ga naar huis", 30, this.canvas.width / 2, 490);
        this.writeTextToCanvas(ctx, "Hij: Ja is goed, ik spreek je op snap", 30, this.canvas.width / 2, 520);
        

    }

}