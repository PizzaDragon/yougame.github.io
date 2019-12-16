/// <reference path='GameScreen.ts'/>
class SchoolPartyDrinkingWithEmily extends GameScreen {
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
        this.writeTextToCanvas(ctx, 'Nadat je wat gedronken hebt met Emily, stuurt je moeder een berichtje.', this.canvas.width / 2, 360)
        this.writeTextToCanvas(ctx, 'Ze staat te wachten om naar huis te gaan.', this.canvas.width / 2, 380)
        this.writeTextToCanvas(ctx, 'Druk op enter om verder te gaan', this.canvas.width / 2, 420)


    }

}