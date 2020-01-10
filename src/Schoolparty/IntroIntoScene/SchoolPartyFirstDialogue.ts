/**
 * Class that handles the first set of dialogue options after the original cutscene in the schoolparty.
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFirstDialogue extends GameScreen {

    //add the global attributes
    private backgroundImage: HTMLImageElement
    private dialogueBar: HTMLImageElement;



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
        //Now, set the src to start loading the image
        this.backgroundImage.src = './assets/images/background/partybackground.jpg'

        this.dialogueBar = new Image()
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png"
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)
        this.writeTextToCanvas(ctx, "*Je staat te dansen met een jongen en hij gaat tegen je praten*", this.canvas.width / 2, this.canvas.height / 2 - 40, 45)
        this.writeTextToCanvas(ctx, "*Hij stelt zich voor als Kees Meerschal,", this.canvas.width / 2, this.canvas.height / 2, 45);
        this.writeTextToCanvas(ctx, "leunt naar je toe en vraagt je snapchat*", this.canvas.width / 2, this.canvas.height / 2 + 40, 45);
        this.writeTextToCanvas(ctx, "Je geeft je snap(toets 1)", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Je zegt niks (toets 2)", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "Je geeft hem je snap niet en wijst hem af (toets 3)", this.canvas.width / 2, this.canvas.height - 30);
    }
}