/**
 * This class handles the basic canvas elements
 */
class Game {
    //global attributes for canvas
    //Readonly attributes are read-only. They can only be initialized in the constructor.
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly game: Game;
    private readonly img: HTMLImageElement;

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
        this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);

        document.getElementById('body').style.maxWidth = "this.canvas.width";

        this.loop();


    }

    private loop = () => {
        this.switchScreen()

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Let the current screen draw itself on the rendering context
        this.currentScreen.draw(this.ctx);

        // Request the next animation frame
        requestAnimationFrame(this.loop);


    }

    public switchScreen() {
        // Here the current screen is the StartScreen, this will be followed up
        // with the first dialogue option, 
        // If you press enter on this screen you will continue to the first 'cutscene'
        if (
            this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ENTER)
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolParty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        //Here the screen switches to the first set of dialogue options at the school party.
        if (
            this.currentScreen instanceof SchoolParty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched your screen);
            this.currentScreen = new SchoolPartyFirstDialogue(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        //Here the screen can go back to the title screen by pressing the escape key on your keyboard.
        //If you continue you cannot go back so if you don't want to play, this is your final return chance.
        if (
            this.currentScreen instanceof SchoolParty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)
        ) {
            this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        //This switches the screen to the bad option, 
        //the bad option will continue to the bad path which you will land in
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            //console.log('you switched your screen to the bad option);
            this.currentScreen = new SchoolPartyFollowUpBad(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        //this switches the screen to the neutral path after the party
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)
        ) {
            //console.log('you switched your screen to the neutral option);
            this.currentScreen = new SchoolPartyFollowUpNeutral(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        //this switches the screen to the good path after the party
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_THREE)
        ) {
            //console.log('you switched your screen to the good option);
            this.currentScreen = new SchoolPartyFollowUpGood(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        if (
            this.currentScreen instanceof SchoolPartyFollowUpNeutral
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolPartySecondFollowUpGood(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
    }


}









// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const You = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);






