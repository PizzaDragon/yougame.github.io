/**
 * Class StartScreen handles the StartScreen, it's attributes and it's methods
 */
/// <reference path='GameScreen.ts' />

class StartScreen extends GameScreen {

    private levelBackground: HTMLImageElement;
    private shouldStartLevel: boolean = false;

    public constructor(game:Game) {
        super(game);
        
    }

    const backgroundImage = "./assets/images/background/startscreen.jpg";
    this.loadImage(backgroundImage, this.drawBackgroundToStartScreen);

    public listen(input: KeyboardListener) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true
        }
    }

    public adjust(game: Game) {
        if (this.shouldStartLevel) {
            game.switchScreen(new SchoolParty(game));
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.writeTextToCanvas(ctx, "You", 140, this.canvas.width/2, 200,);
        this.writeTextToCanvas(ctx, "PRESS ENTER TO PLAY", 30, this.canvas.width/2, 400,)



    }

    public drawBackgroundToStartScreen(img: HTMLImageElement) {
        let x = 0;
        let y = 0;
        this.ctx.drawImage(img, x, y);
    }
}

