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
        this.writeTextToCanvas(ctx, 'Nadat je wat gedronken hebt met Emily, stuurt je moeder een berichtje dat ze staat te wachten om naar huis te gaan.', 80, this.canvas.width / 2, 360)
        this.writeTextToCanvas(ctx, 'Druk op spatie om verder te gaan', 30, this.canvas.width / 2, 420)

        
    }

}