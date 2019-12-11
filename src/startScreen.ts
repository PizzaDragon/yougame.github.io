/**
 * Class StartScreen handles the StartScreen, it's attributes and it's methods
 */
/// <reference path='GameScreen.ts' />

class StartScreen extends GameScreen {

    private levelBackground: HTMLImageElement;
    private shouldStartLevel: boolean = false;

    public constructor(game:Game) {
        super(game);
        document.body.style.backgroundImage = "/assets/images/background/startscreen.jpg"
    }

    public listen(input: KeyboardListener) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true
        }
    }

    // public adjust(game: Game) {
    //     if (this.shouldStartLevel) {
    //         game.switchScreen();
    //     }
    // }

    public draw(ctx: CanvasRenderingContext2D) {
        this.writeTextToCanvas(ctx, "You", 140, 500, 200,);
        this.writeTextToCanvas(ctx, "PRESS ENTER TO PLAY", 30, 500, 400, )
    }
}

//push