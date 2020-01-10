/**
 * SchoolPartyFollowUpBad handles the follow up from the schoolparty
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpBad extends GameScreen {

    // //add the global attributes
    private backgroundImage: HTMLImageElement;
    private characterImage: HTMLImageElement;
    private dialogueBar: HTMLImageElement



    //Add the constructor
    public constructor(
        game: Game,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        keyboardListener: KeyboardListener,
        name: string

    ) {
        //Add a super constructor which will handle the level when it is drawn
        super(game, canvas, ctx, img, keyboardListener, name);



        //Loads the backgroundImage into the memory
        this.backgroundImage = new Image();
        // Now, set the src to start loading the image
        this.backgroundImage.src = "./assets/images/background/partybackground.jpg"

        //loads a character image into the memory
        this.characterImage = new Image();
        // Now, set the src to start loading the image
        this.characterImage.src = "./assets/images/characters/Kees1.png"

        this.dialogueBar = new Image()
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png"
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.55, this.canvas.width, this.canvas.height)
        this.writeTextToCanvas(ctx, "Je kijkt naar hem, geeft hem een glimlach", this.canvas.width / 2, this.canvas.height / 2 - 20, 50);
        this.writeTextToCanvas(ctx, "en geeft hem je snapchat.", this.canvas.width / 2, this.canvas.height / 2 + 20, 50)
        this.writeTextToCanvas(ctx, `${this.name}: Je mag hem alleen hebben als je belooft dat je niet zal lachen `, this.canvas.width / 2, this.canvas.height - 230);
        this.writeTextToCanvas(ctx, "Hij: Ja oke, ik beloof dat ik niet zal lachen. ", this.canvas.width / 2, this.canvas.height - 190);
        this.writeTextToCanvas(ctx, `${this.name}: Oke vooruit dan maar, alsjeblieft`, this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, `${this.name}: Hey maar mijn moeder is er dus ik ga naar huis`, this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Hij: Ja is goed, ik spreek je op snap", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 30)
    }

}