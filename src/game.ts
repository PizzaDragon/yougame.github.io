/**
 * This class handles the basic canvas elements
 */
class Game {
    //global attributes for canvas
    //Readonly attributes are read-only. They can only be initialized in the constructor.
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly game: Game;

    //Handles screen events
    private currentScreen: GameScreen;
    private keyboardListener: KeyboardListener;

    public constructor(canvasId: HTMLCanvasElement) {
        //Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        //Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new StartScreen(this.game);

        this.loop();
    }

    private loop = () => {
        // this.switchScreen()

         // Clear the canvas
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         // Let the current screen draw itself on the rendering context
         this.currentScreen.draw(this.ctx);

         // Request the next animation frame
        requestAnimationFrame(this.loop);

        
    }

    // private switchScreen() {
    //     // If the current screen is an instance of the StartScreen class
    //     // Basically: if the current screen is the start screen
    //     // And the user pressed "s", render the level screen
    //     if (
    //         this.currentScreen instanceof StartScreen
    //         && this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)
    //     ) {
    //         this.currentScreen = new LevelScreen(this.canvas, this.ctx, this.keyboardListener);
    //     }

    //     if (
    //         this.currentScreen instanceof LevelScreen
    //         && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)
    //     ) {
    //         this.currentScreen = new TitleScreen(this.canvas, this.ctx);
    //     }
    // }

   
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const You = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);

    //push


   

