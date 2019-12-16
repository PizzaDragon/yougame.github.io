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
        /**
         * These first few if statements will take you from the startscreen 
         * into the game it self.
         */
        if (
            this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ENTER)
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolParty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }

        //Here the screen can go back to the title screen by pressing the escape key on your keyboard.
        //If you continue you cannot go back so if you don't want to play, this is your final return chance.
        if (
            this.currentScreen instanceof SchoolParty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)
        ) {
            this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }

        /**
         * in this screen you can choose 1, 2 or 3,
         * 1 takes you into the bad path, if you want to look at this in code it is in the bad map of Schoolparty
         * 2 takes you into the neutral path, if you want to look at this in code it is in the neutral map of SchoolParty
         * 3 takes you into the good path, if you want to look at this in code it is in the good map of SchoolParty
         */
        if (
            this.currentScreen instanceof SchoolParty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched your screen);
            this.currentScreen = new SchoolPartyFirstDialogue(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }

        //This option let's you press one to go into the bad dialogue path
        //the screen will switch to SchoolPartyFollowUpBad
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            //console.log('you switched your screen to the bad option);
            this.currentScreen = new SchoolPartyFollowUpBad(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }

        //This option let's you press two to go into the neutral dialogue path
        //the screen will switch to SchoolPartyFollowUpNeutral
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)
        ) {
            //console.log('you switched your screen to the neutral option);
            this.currentScreen = new SchoolPartyFollowUpNeutral(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }

        //This option let's you press three to go into the good dialogue path
        //the screen will switch to SchoolPartyFollowUpGood
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_THREE)
        ) {
            //console.log('you switched your screen to the good option);
            this.currentScreen = new SchoolPartyFollowUpGood(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }

        /**
         * These next if statements will follow up the neutral choice 
         * when you first select the neutral dialogue option
         */
        //This if statement will take you into the next dialogue tree option if you
        //choose to ignore him
        if (
            this.currentScreen instanceof SchoolPartyFollowUpNeutral
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolPartyFollowUpNeutralPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        if (
            this.currentScreen instanceof SchoolPartyFollowUpNeutralPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolPartyFollowUpNeutralPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }
        if (
            this.currentScreen instanceof SchoolPartyFollowUpNeutralPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay() === 144
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolPartyFollowUpBadCutscene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }

        /**
         * These next if statements will follow up the good choice
         * when you first select the good dialogue option
         */
        //This if-statement will take you to the next dialogue tree option if you first choose
        //not to give your snapchat
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGood
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            // console.log('you switched screens');
            this.currentScreen = new SchoolPartyFollowUpGoodPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }

        //This if-statement will take you to the screen if you choose to give him your snapchat after you have 
        //chosen not to
        //The scene where you actually give him your snapchat, no dialogue just an image of you giving your snapchat.
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGoodPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched screens');
            this.currentScreen = new SchoolPartySnapCutscene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener);
        }


    }

    private delay() {
        for (let i = 0; i < 144; i++) {
            return i;

        }
        return this.delay;
    }


}









// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const You = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);






