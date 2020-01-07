/**
 * HomeSceneGood handles the follow up from the good option in schoolparty
 */
/// <reference path='../../GameScreen.ts'/>
class SchoolPartyFollowUpGoodPartTwo extends GameScreen {

    // //add the global attributes
    private shouldStartLevel: boolean = false;
    private backgroundImage: HTMLImageElement;
    private keesImage: HTMLImageElement;
    private youImage: HTMLImageElement;
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
       this.keesImage = new Image();
       this.youImage = new Image();
       this.dialogueBar = new Image()
       //Now, set the src to start loading the image
       this.backgroundImage.src = './assets/images/background/partybackground.jpg';
       this.keesImage.src = "./assets/images/characters/kees1.png";
       this.youImage.src = "./assets/images/characters/karakter2.png";
       this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
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
        //this.ctx.drawImage(this.keesImage, -350, 0,)
        this.ctx.drawImage(this.youImage, 0, 0,)
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height)

        //This handles the dialogue in the screen
        this.writeTextToCanvas(ctx, "Je kijkt raar op. Ik, een loser?", this.canvas.width / 2, this.canvas.height/2-30, 50);
        this.writeTextToCanvas(ctx, "Heb ik wel de goede keuze gemaakt?", this.canvas.width / 2, this.canvas.height/2+30, 50);
        this.writeTextToCanvas(ctx, "Ga naar hem, bied je excuses aan en geef je snapchat (toets 1) ", this.canvas.width / 2, this.canvas.height -120);
        this.writeTextToCanvas(ctx, "Nee, ik vertrouw hem echt niet (toets 2). ", this.canvas.width / 2, this.canvas.height -80);
        this.writeTextToCanvas(ctx, "Jij: Oke, ik geef hem mijn snap, als ik hem niet mag verwijder ik hem gewoon (toets 3)", this.canvas.width / 2, this.canvas.height -40);
    }

}