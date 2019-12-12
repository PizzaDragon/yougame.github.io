/**
 * SchoolPartyFollowUpBad handles the follow up from the schoolparty
 */
/// <reference path='GameScreen.ts'/>
class SchoolPartyFollowUpBad extends GameScreen {

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
        this.writeTextToCanvas(ctx, "Je kijkt naar Kees, geeft hem een glimlach en geef hem je snapchat.", 50, this.canvas.width/2, 200);
        this.writeTextToCanvas(ctx, "Jij: Kijk eens aan, jongen. Met al die spieren die je hersenen pletten ben je hopelijk nog niet te dom om te lezen, hé? ", 30, this.canvas.width / 2, 400);
        this.writeTextToCanvas(ctx, "Hij: Hah! Jij kan praten. Ik kan tenminste de letters in mijn wiskundeopdrachten begrijpen. *typt naam over* ", 30, this.canvas.width / 2, 430);
        this.writeTextToCanvas(ctx, "Jij: Goed punt. Jij bent altijd nog te snel voor mij, ouwe. ", 30, this.canvas.width / 2, 460);
        this.writeTextToCanvas(ctx, "Hij: Oh, wacht jij maar tot je in de 4e zit. Ik ben al zo oud dat mijn botten kraken. *stuurt verzoek op snapchat* ", 30, this.canvas.width / 2, 490);
        this.writeTextToCanvas(ctx, "Jij: Nou, ik ga maar weer eens naar huis. Ik denk niet dat mijn moeder het leuk zal vinden dat ik hier ben geweest. ", 30, this.canvas.width / 2, 520);
        this.writeTextToCanvas(ctx, "jij: Ik spreek je later nog wel. Verlies je leesbrilletje niet voordat we kunnen praten op snapchat, opa! *lacht* ", 30, this.canvas.width / 2, 550);
        this.writeTextToCanvas(ctx, "Hij: Zal ik zeker niet doen! Ik zie je morgen wel. Misschien stuur ik je straks nog wel een berichtje. ", 30, this.canvas.width / 2, 590);        
        this.writeTextToCanvas(ctx, "Jij: Is goed! Doei!  ", 30, this.canvas.width / 2, 680);
        this.writeTextToCanvas(ctx, "Hij: Doei!  ", 30, this.canvas.width / 2, 720);


        //     const backgroundImage = "./assets/images/background/SchoolPartyBackground.jpg";
    //     this.loadImage(backgroundImage, this.drawBackgroundToScreen);
     }

}