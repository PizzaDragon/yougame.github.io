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
    private delay: number;
    private score: number;
    private name: string;

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
        this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        this.delay = 1

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

        if (this.delay > 0) {
            this.delay++
        }


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
            // this.name = this.nameInput()
            this.currentScreen = new NameScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);

        }
        if (
            this.currentScreen instanceof NameScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolParty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }

        //Here the screen can go back to the title screen by pressing the escape key on your keyboard.
        //If you continue you cannot go back so if you don't want to play, this is your final return chance.
        if (
            this.currentScreen instanceof NameScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)
        ) {
            this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }


        /**
         * in this screen you can choose 1, 2 or 3,
         * 1 takes you into the bad path, if you want to look at this in code it is in the bad map of Schoolparty
         * 2 takes you into the neutral path, if you want to look at this in code it is in the neutral map of SchoolParty
         * 3 takes you into the good path, if you want to look at this in code it is in the good map of SchoolParty
         */
        if (
            this.currentScreen instanceof SchoolParty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            //console.log('you switched your screen);
            this.currentScreen = new SchoolPartyFirstDialogue(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }

        //This option let's you press one to go into the bad dialogue path
        //the screen will switch to SchoolPartyFollowUpBad
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            //console.log('you switched your screen to the bad option);
            this.currentScreen = new SchoolPartyFollowUpBad(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        //now, you branch to the scene where you give him your snapchat
        if (
            this.currentScreen instanceof SchoolPartyFollowUpBad
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            this.currentScreen = new SchoolPartyFollowUpSnapCutscene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        //Now you go into the scene where you get in the car with your mom
        if (
            this.currentScreen instanceof SchoolPartyFollowUpSnapCutscene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolPartyEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
            this.score = 0;
        }

        //This option let's you press two to go into the neutral dialogue path
        //the screen will switch to SchoolPartyFollowUpNeutral
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)
        ) {
            //console.log('you switched your screen to the neutral option);
            this.currentScreen = new SchoolPartyFollowUpNeutral(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }

        //This option let's you press three to go into the good dialogue path
        //the screen will switch to SchoolPartyFollowUpGood
        if (
            this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_THREE)
        ) {
            //console.log('you switched your screen to the good option);
            this.currentScreen = new SchoolPartyFollowUpGood(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
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
            this.currentScreen = new SchoolPartyFollowUpNeutralPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (
            this.currentScreen instanceof SchoolPartyFollowUpNeutralPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolPartyFollowUpNeutralPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (
            this.currentScreen instanceof SchoolPartyFollowUpNeutralPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolPartyEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
            this.score = 50;
        }
        if (
            this.currentScreen instanceof SchoolPartyFollowUpNeutral
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolPartyFollowUpNeutralBad1(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0
        }
        if (

            this.currentScreen instanceof SchoolPartyFollowUpNeutralBad1
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched your screen');
            this.currentScreen = new SchoolPartyFollowUpBad(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0
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
            this.currentScreen = new SchoolPartyFollowUpGoodPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);

        }
        //This if-statement will take you to the screen if you choose to give him your snapchat after you have 
        //chosen not to,
        //This scene will take you straight to the bad cutscene which is followed by a dialogue option in the bad path.
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGoodPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            //console.log('you switched screens');
            this.currentScreen = new SchoolPartyFollowUpGoodPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        //Now, this scene will take you to your the scene where you give him your snap
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGoodPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched screens');
            this.currentScreen = new SchoolPartyFollowUpSnapCutscene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof SchoolPartyFollowUpSnapCutscene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolPartyEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name)
            this.delay = 1;
            this.score = 100;
        }

        //This if-statement will take you to the screen if you choose to not give him 
        //your snapchat by pressing 2 on your screen
        //It will take you to a cutscene with your mother.
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGoodPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)
        ) {
            //console.log('you switched screens');
            this.currentScreen = new SchoolPartyFollowUpGoodPartFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        //this scene will take you to the conservation with your mom
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGoodPartFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            //console.log('you switched screens');
            this.currentScreen = new SchoolPartyFollowUpGoodPartFive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }

        //now, this scene will take you to the cutscene where you are driving in the car
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGoodPartFive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            //console.log('you switched screens');
            this.currentScreen = new SchoolPartyEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
            this.score = 100;
        }


        //This if statement will take you to the screen if you choose to give him your snapchat after you have
        //chosen not to,
        //here you regret that you did not give him
        //so you think, meh whats the worst what could happen
        //so you apologize
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGoodPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_THREE)
        ) {
            // console.log('you switched screens');
            this.currentScreen = new SchoolPartyFollowUpGoodPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        //now, this scene will take you to you giving your snap
        if (
            this.currentScreen instanceof SchoolPartyFollowUpGoodPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            //console.log('you switched screens');
            this.currentScreen = new SchoolPartyFollowUpSnapCutscene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0;
        }








        /**
         * These next options will handle the evenst
         * after the schoolparty 
         * so these wil be the if statements
         * for the home dialogue
         */

        //This is the beginning of the bad homeScenario
        if (
            this.currentScreen instanceof SchoolPartyEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeIntroScene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }

        //This is the follow up cutscene in the bad path of the home scenario
        //This is where you snap with him
        //each time you press the Space key,
        //the scene progresses.
        if (
            this.currentScreen instanceof HomeNeutralFollowUpOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            this.currentScreen = new HomeBadSnapOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeIntroScene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60 && this.score == 0
        ) {
            this.currentScreen = new HomeBadSnapOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapFive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapFive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapSix(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapSix
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapSeven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapSeven
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapEight(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapEight
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapNine(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapNine
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapEleven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapEleven
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwelve(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwelve
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThirteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapThirteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapFourteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapFourteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapFifteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapFifteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapSixteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapSixteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapSeventeen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapSeventeen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapEightteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapEightteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapNineteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapNineteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwenty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwenty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentyone(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        // This is the point you select the option to send
        // nudes, which is the bad option and will keep you 
        //on the bad path
        if (
            this.currentScreen instanceof HomeBadSnapTwentyone
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadDialogueOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        //These if statements continue the bad path until you get another option
        if (
            this.currentScreen instanceof HomeBadDialogueOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentytwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwentytwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentythree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwentythree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentyfour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwentyfour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentyfive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwentyfive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentysix(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwentysix
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomebadPartOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        //This is the scenario where
        //you tell your parents
        //you have send nudes to Kees
        if (
            this.currentScreen instanceof HomebadPartOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentyseven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }

        //This is the scenario where you don't tell 
        //your parents
        if (
            this.currentScreen instanceof HomebadPartOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentyseven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwentyseven
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentyeight(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwentyeight
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapTwentynine(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapTwentynine
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThirty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapThirty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThirtyone(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapThirtyone
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThirtytwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapThirtytwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThirtythree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapThirtythree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThirtyfour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapThirtyfour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThirtyfive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapThirtyfive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapThirtysix(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        //This next one is the dialogue where you decide if you
        //pay or not
        if (
            this.currentScreen instanceof HomeBadSnapThirtysix
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadDialogueTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        //This is the scenario where you pay
        //him to not leak your nudes
        if (
            this.currentScreen instanceof HomeBadDialogueTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapDialoogBadOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapDialoogBadOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapDialoogBadTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapDialoogBadTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapDialoogBadThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapDialoogBadThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapDialoogBadFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapDialoogBadFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }

        //This is the scenario where you don't pay him
        //And you don't know if he leaks your nudes or not
        if (
            this.currentScreen instanceof HomeBadDialogueTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapDialoogGoodOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapDialoogGoodOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapDialoogGoodTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapDialoogGoodTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapDialoogGoodThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapDialoogGoodThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadSnapDialoogGoodFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeBadSnapDialoogGoodFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeBadEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }

        //Now you go to your school
        //You don't know if they have been leaked or not
        //You hope not
        if (
            this.currentScreen instanceof HomeBadEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolBadPartOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof SchoolBadPartOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolBadPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof SchoolBadPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolBadPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        //this goes to the end
        if (
            this.currentScreen instanceof SchoolBadPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new End(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }




        //This is the point where you get a choice
        //Give your nudes 
        //or don't give your nudes
        //If you give them you will continue on the bad path
        //If you don't you will go to the neutral path
        if (
            this.currentScreen instanceof HomeBadDialogueOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            this.currentScreen = new HomeNeutralEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }


        //This is the beginning of the Neutral HomeScenario
        if (
            this.currentScreen instanceof HomeIntroScene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60 && this.score == 50
        ) {
            this.currentScreen = new HomeNeutralFollowUpOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeNeutralFollowUpOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            this.currentScreen = new HomeNeutralFollowUpTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeNeutralFollowUpTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE) && this.delay > 60
        ) {
            this.currentScreen = new HomeNeutralSnapOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeNeutralSnapOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeNeutralSnapTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeNeutralSnapTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeNeutralSnapThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeNeutralSnapThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeNeutralSnapFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeNeutralSnapFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeNeutralEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }

        //This is the beginning of the Good HomeScenario
        if (
            this.currentScreen instanceof HomeIntroScene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60 && this.score == 100
        ) {
            this.currentScreen = new HomeGoodFollowUpOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeGoodFollowUpOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeGoodFollowUpTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeGoodFollowUpTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new HomeGoodDialogueOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        //This if statement will take you to the good ending
        if (this.currentScreen instanceof HomeGoodDialogueOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)
        ) {
            this.currentScreen = new HomeGoodEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (
            this.currentScreen instanceof HomeNeutralFollowUpOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_THREE)
        ) {
            this.currentScreen = new HomeGoodBlockedSnap(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (
            this.currentScreen instanceof HomeGoodBlockedSnap
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            this.currentScreen = new HomeGoodEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (
            this.currentScreen instanceof HomeNeutralFollowUpTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)
        ) {
            this.currentScreen = new HomeGoodEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof HomeGoodDialogueOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            this.currentScreen = new HomeNeutralSnapOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }



        /**
        * These next options will handle the evenst
        * after the home dialogue 
        * so these wil be the if statements
        * for the school dialogue
        */

        //This is the beginning of the neutral school path
        if (this.currentScreen instanceof HomeNeutralEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolNeutralPartOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof SchoolNeutralPartOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolNeutralPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof SchoolNeutralPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolNeutralPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof SchoolNeutralPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            this.currentScreen = new SchoolNeutralPartFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof SchoolNeutralPartFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolNeutralPartFive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof SchoolNeutralPartFive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolNeutralPartSix(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof SchoolNeutralPartSix
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            this.currentScreen = new SchoolNeutralPartSeven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof SchoolNeutralPartSeven
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolNeutralPartEight(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof SchoolNeutralPartEight
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            this.currentScreen = new NeutralEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }


        //this will take you to the good part of the school scenario
        if (this.currentScreen instanceof HomeGoodEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodIntro(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodIntro
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodPart1(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart1
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodDialogue1(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0
        }

        //if you choose the second option
        if (this.currentScreen instanceof SchoolGoodDialogue1
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)
        ) {
            this.currentScreen = new SchoolGoodDialogue1Part2(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        //if you choose the second option
        if (this.currentScreen instanceof SchoolGoodDialogue1Part2
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodDialogue1Part3(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolGoodDialogue1Part3
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)
        ) {
            this.currentScreen = new SchoolGoodPart2(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart2
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodPart3(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart3
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodPart4(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart4
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodPart5(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart5
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodPart6(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart6
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodPart7(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart7
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodPart8(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart8
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodPart9(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodPart9
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new SchoolGoodDialogue2(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0
        }
        if (this.currentScreen instanceof SchoolGoodDialogue2
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)
        ) {
            this.currentScreen = new SchoolGoodEnding1(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }
        if (this.currentScreen instanceof SchoolGoodDialogue2
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)
        ) {
            this.currentScreen = new SchoolGoodEnding2(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }


        //This is the End



        if (this.currentScreen instanceof NeutralEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60
        ) {
            this.currentScreen = new End(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_E) && this.keyboardListener.isKeyDown(KeyboardListener.KEY_N) && this.keyboardListener.isKeyDown(KeyboardListener.KEY_D) && this.delay > 60
        ) {
            this.currentScreen = new End(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1
        }

        if (
            this.currentScreen instanceof End
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)
        ) {
            this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }


    }

    public nameInput() {
        let name = prompt("Geef je personage een naam")
        return name;
    }
}









// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const You = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);






