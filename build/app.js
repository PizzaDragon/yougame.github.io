class GameScreen {
    constructor(game, canvas, ctx, img, keyboardlistener, name) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.img = img;
        this.keyboardListener = keyboardlistener;
        this.name = name;
    }
    draw(ctx) {
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 30, alignment = "center", color = "white", outline = "black") {
        ctx.font = `${fontSize}px Helvetica`;
        ctx.strokeStyle = outline;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.strokeText(text, xCoordinate, yCoordinate);
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyPress = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
        window.addEventListener("keypress", this.keyPress);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
    isKeyPress(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_ONE = 49;
KeyboardListener.KEY_TWO = 50;
KeyboardListener.KEY_THREE = 51;
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_S = 83;
KeyboardListener.KEY_ENTER = 13;
KeyboardListener.KEY_E = 69;
KeyboardListener.KEY_N = 78;
KeyboardListener.KEY_D = 68;
class NameScreen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = './assets/images/background/startscreen2.jpg';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `Je personage heet nu ${this.name}`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, 'DRUK OP ESCAPE OM HET SPEL TE VERLATEN', 240, 20, 20);
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.switchScreen();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw(this.ctx);
            requestAnimationFrame(this.loop);
            if (this.delay > 0) {
                this.delay++;
            }
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        this.delay = 1;
        document.getElementById('body').style.maxWidth = "this.canvas.width";
        this.loop();
    }
    switchScreen() {
        if (this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.currentScreen = new NameScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof NameScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolParty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof NameScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolParty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolPartyFirstDialogue(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)) {
            this.currentScreen = new SchoolPartyFollowUpBad(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpBad
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolPartyFollowUpSnapCutscene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpSnapCutscene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolPartyEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
            this.score = 0;
        }
        if (this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)) {
            this.currentScreen = new SchoolPartyFollowUpNeutral(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolPartyFirstDialogue
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_THREE)) {
            this.currentScreen = new SchoolPartyFollowUpGood(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpNeutral
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)) {
            this.currentScreen = new SchoolPartyFollowUpNeutralPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpNeutralPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolPartyFollowUpNeutralPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpNeutralPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolPartyEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
            this.score = 50;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpNeutral
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new SchoolPartyFollowUpNeutralBad1(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpNeutralBad1
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolPartyFollowUpBad(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpGood
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolPartyFollowUpGoodPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpGoodPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)) {
            this.currentScreen = new SchoolPartyFollowUpGoodPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpGoodPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolPartyFollowUpSnapCutscene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpSnapCutscene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolPartyEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
            this.score = 100;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpGoodPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)) {
            this.currentScreen = new SchoolPartyFollowUpGoodPartFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpGoodPartFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolPartyFollowUpGoodPartFive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpGoodPartFive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolPartyEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
            this.score = 100;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpGoodPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_THREE)) {
            this.currentScreen = new SchoolPartyFollowUpGoodPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolPartyFollowUpGoodPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolPartyFollowUpSnapCutscene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0;
        }
        if (this.currentScreen instanceof SchoolPartyEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeIntroScene(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeNeutralFollowUpOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)) {
            this.currentScreen = new HomeBadSnapOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeIntroScene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60 && this.score == 0) {
            this.currentScreen = new HomeBadSnapOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapFive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapFive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapSix(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapSix
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapSeven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapSeven
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapEight(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapEight
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapNine(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapNine
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapEleven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapEleven
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwelve(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwelve
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThirteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThirteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapFourteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapFourteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapFifteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapFifteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapSixteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapSixteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapSeventeen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapSeventeen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapEightteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapEightteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapNineteen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapNineteen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwenty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwenty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentyone(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentyone
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadDialogueOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadDialogueOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentytwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentytwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentythree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentythree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentyfour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentyfour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentyfive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentyfive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentysix(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentysix
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomebadPartOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomebadPartOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE) && this.delay > 60) {
            this.currentScreen = new HomeBadPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentyseven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomebadPartOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentyseven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentyseven
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentyeight(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentyeight
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapTwentynine(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapTwentynine
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThirty(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThirty
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThirtyone(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThirtyone
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThirtytwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThirtytwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThirtythree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThirtythree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThirtyfour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThirtyfour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThirtyfive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThirtyfive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapThirtysix(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapThirtysix
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadDialogueTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadDialogueTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapDialoogBadOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapDialoogBadOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapDialoogBadTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapDialoogBadTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapDialoogBadThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapDialoogBadThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapDialoogBadFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapDialoogBadFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadDialogueTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapDialoogGoodOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapDialoogGoodOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapDialoogGoodTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapDialoogGoodTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapDialoogGoodThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapDialoogGoodThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadSnapDialoogGoodFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadSnapDialoogGoodFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeBadEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolBadPartOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolBadPartOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolBadPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolBadPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolBadPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolBadPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new End(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeBadDialogueOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new HomeNeutralEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeIntroScene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60 && this.score == 50) {
            this.currentScreen = new HomeNeutralFollowUpOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeNeutralFollowUpOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new HomeNeutralFollowUpTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeNeutralFollowUpTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE) && this.delay > 60) {
            this.currentScreen = new HomeNeutralSnapOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeNeutralSnapOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeNeutralSnapTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeNeutralSnapTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeNeutralSnapThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeNeutralSnapThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeNeutralSnapFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeNeutralSnapFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeNeutralEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeIntroScene
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60 && this.score == 100) {
            this.currentScreen = new HomeGoodFollowUpOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeGoodFollowUpOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeGoodFollowUpTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeGoodFollowUpTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new HomeGoodDialogueOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeGoodDialogueOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)) {
            this.currentScreen = new HomeGoodEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof HomeGoodDialogueOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)) {
            this.currentScreen = new HomeNeutralSnapOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof HomeNeutralEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolNeutralPartOne(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolNeutralPartOne
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolNeutralPartTwo(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolNeutralPartTwo
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolNeutralPartThree(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolNeutralPartThree
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new SchoolNeutralPartFour(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolNeutralPartFour
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolNeutralPartFive(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolNeutralPartFive
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolNeutralPartSix(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolNeutralPartSix
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new SchoolNeutralPartSeven(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolNeutralPartSeven
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolNeutralPartEight(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolNeutralPartEight
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new NeutralEnding(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof HomeGoodEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolGoodIntro(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodIntro
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodPart1(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart1
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodDialogue1(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0;
        }
        if (this.currentScreen instanceof SchoolGoodDialogue1
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)) {
            this.currentScreen = new SchoolGoodDialogue1Part2(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodDialogue1Part2
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO) && this.delay > 60) {
            this.currentScreen = new SchoolGoodDialogue1Part3(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
        if (this.currentScreen instanceof SchoolGoodDialogue1Part3
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new SchoolGoodPart2(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart2
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodPart3(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart3
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodPart4(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart4
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodPart5(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart5
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodPart6(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart6
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodPart7(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart7
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodPart8(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart8
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodPart9(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodPart9
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new SchoolGoodDialogue2(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 0;
        }
        if (this.currentScreen instanceof SchoolGoodDialogue2
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ONE)) {
            this.currentScreen = new SchoolGoodEnding1(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof SchoolGoodDialogue2
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_TWO)) {
            this.currentScreen = new SchoolGoodEnding2(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof NeutralEnding
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.delay > 60) {
            this.currentScreen = new End(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_E) && this.keyboardListener.isKeyDown(KeyboardListener.KEY_N) && this.keyboardListener.isKeyDown(KeyboardListener.KEY_D) && this.delay > 60) {
            this.currentScreen = new End(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
            this.delay = 1;
        }
        if (this.currentScreen instanceof End
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new StartScreen(this.game, this.canvas, this.ctx, this.img, this.keyboardListener, this.name);
        }
    }
    nameInput() {
        let name = prompt("Geef je personage een naam");
        return name;
    }
}
let init = () => {
    const You = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class StartScreen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = './assets/images/background/startscreen2.jpg';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "You", this.canvas.width / 2, this.canvas.height / 2 - 40, 200);
        this.writeTextToCanvas(ctx, "DRUK OP ENTER OM TE SPELEN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class End extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "EINDE", this.canvas.width / 2, this.canvas.height - 400, 200);
        this.writeTextToCanvas(ctx, "Credits:", this.canvas.width / 2, this.canvas.height - 300);
        this.writeTextToCanvas(ctx, "Calvin Hannewijk", this.canvas.width / 2, this.canvas.height - 260);
        this.writeTextToCanvas(ctx, "Evan Verdoorn", this.canvas.width / 2, this.canvas.height - 220);
        this.writeTextToCanvas(ctx, "Leslie Scherbeijn", this.canvas.width / 2, this.canvas.height - 180);
        this.writeTextToCanvas(ctx, "Neo McNeese", this.canvas.width / 2, this.canvas.height - 140);
        this.writeTextToCanvas(ctx, 'DRUK OP ESCAPE OM HET SPEL TE VERLATEN', 240, 20, 20);
    }
}
class NeutralEnding extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je besluit om te gaan leren was toch wel handig.", this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, "Je hebt het jaar met dikke voldoendes gehaald.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Voor de rest heb je niet veel beleefd, zo nu en dan eens met Emily afgesproken,", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "maar daar houdt het wel op.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Op naar het tweede jaar.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN.", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class HomeBadSnapFifteen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap15.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadDialogueOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoog1.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3.25, this.canvas.height / 1.25);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Ja. (Toets 1)", this.canvas.width / 2, this.canvas.height - 80);
        this.writeTextToCanvas(ctx, "Nee. (Toets 2)", this.canvas.width / 2, this.canvas.height - 40);
    }
}
class HomeBadSnapTwentysix extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad5.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwentyfive extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad4.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwentyfour extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad3.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadDialogueTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoog2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3.25, this.canvas.height / 1.25);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Betaal. (Toets 1)", this.canvas.width / 2, this.canvas.height - 80);
        this.writeTextToCanvas(ctx, "Betaal niet. (Toets 2)", this.canvas.width / 2, this.canvas.height - 40);
    }
}
class HomeBadEnding extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.momImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.momImage.src = "./assets/images/characters/moeder1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.40, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `${this.name}: Nou, hopen dat dat goed komt.`, this.canvas.width / 2, this.canvas.height - 180);
        this.writeTextToCanvas(ctx, `Laat ik maar gaan slapen, morgen heb ik een lange dag school`, this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomebadPartOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.momImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.momImage.src = "./assets/images/characters/moeder1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.40, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `${this.name}: Onee, hij heeft een screenshot gemaakt. Wat nu?`, this.canvas.width / 2, this.canvas.height - 180);
        this.writeTextToCanvas(ctx, `${this.name}: Moet ik dit aan mijn ouders vertellen?`, this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, `${this.name}: Of moet ik het laten gaan en afwachten?`, this.canvas.width / 2, this.canvas.height - 120);
        this.writeTextToCanvas(ctx, "Vertel het je ouders (toets 1)", this.canvas.width / 2, this.canvas.height - 80);
        this.writeTextToCanvas(ctx, "Vertel het je ouders niet (toets 2)", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeBadPartThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.momImage = new Image();
        this.youImage = new Image();
        this.dadImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/livingRoomBackground.jpg';
        this.momImage.src = "./assets/images/characters/moeder1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dadImage.src = './assets/images/characters/vader1.png';
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.momImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dadImage, -550, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `Mama: Verdorie ${this.name}, dat is nu echt het stomste dat je kan doen.`, this.canvas.width / 2, this.canvas.height / 2 - 120);
        this.writeTextToCanvas(ctx, `${this.name}: Ja, ik weet het, ik was stom maar ik weet niet hoe`, this.canvas.width / 2, this.canvas.height / 2 - 80);
        this.writeTextToCanvas(ctx, "ik dit moet oplossen", this.canvas.width / 2, this.canvas.height / 2 - 40);
        this.writeTextToCanvas(ctx, `Mama: ${this.name}, ja. Lastig, wat denk jij lieverd?`, this.canvas.width / 2, this.canvas.height / 2);
        this.writeTextToCanvas(ctx, "Papa: Ja, gewoon in zijn beloop laten denk ik. Meer kunnen we ook niet doen.", this.canvas.width / 2, this.canvas.height / 2 + 40);
        this.writeTextToCanvas(ctx, `Het zal allemaal wel goed komen neem ik aan.`, this.canvas.width / 2, this.canvas.height / 2 + 80);
        this.writeTextToCanvas(ctx, `${this.name}: Weet je het zeker? Is dat het slimste?`, this.canvas.width / 2, this.canvas.height / 2 + 120);
        this.writeTextToCanvas(ctx, `Papa: Meer kunnen we niet doen toch?`, this.canvas.width / 2, this.canvas.height / 2 + 160);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeBadPartTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.momImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/livingRoomBackground.jpg';
        this.momImage.src = "./assets/images/characters/moeder1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.momImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `Mama: Hey ${this.name}, hoe gaat het?`, this.canvas.width / 2, this.canvas.height / 2 - 120);
        this.writeTextToCanvas(ctx, `${this.name}: Niet zo goed eigenlijk, er is wat gebeurt`, this.canvas.width / 2, this.canvas.height / 2 - 80);
        this.writeTextToCanvas(ctx, "Mama: Wat dan?", this.canvas.width / 2, this.canvas.height / 2 - 40);
        this.writeTextToCanvas(ctx, `${this.name}: Nou... Ik was via snapchat aan het praten met een jongen..`, this.canvas.width / 2, this.canvas.height / 2);
        this.writeTextToCanvas(ctx, "Mama: En toen?", this.canvas.width / 2, this.canvas.height / 2 + 40);
        this.writeTextToCanvas(ctx, `${this.name}: Nou, hij vroeg om naaktfoto's en ik gaf ze. Hij zou ze niet screenshotten`, this.canvas.width / 2, this.canvas.height / 2 + 80);
        this.writeTextToCanvas(ctx, `${this.name}: Maar dat deed hij wel`, this.canvas.width / 2, this.canvas.height / 2 + 120);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeBadSnapDialoogBadFour extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad9.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapDialoogBadOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad6.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapDialoogBadThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad8.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapDialoogBadTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad7.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapDialoogGoodFour extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogGood4.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapDialoogGoodOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogGood1.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapDialoogGoodThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogGood3.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapDialoogGoodTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogGood2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapEight extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap8.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapEightteen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap18.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapEleven extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap11.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapFive extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap5.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapFour extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap4.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapFourteen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap14.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapNine extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap9.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapNineteen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap19.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap1.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapSeven extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap7.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapSeventeen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap17.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapSix extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap6.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapSixteen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap16.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap10.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThirteen extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap13.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThirty extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap25.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThirtysix extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap31.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThirtyfive extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap30.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThirtyfour extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap29.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThirtyone extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap26.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThirtythree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap28.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThirtytwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap27.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap3.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwelve extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap12.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwenty extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap20.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwentyeight extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap23.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwentynine extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap24.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwentyone extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap21.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwentyseven extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap22.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwentythree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwentytwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snapDialoogBad1.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeBadSnapTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.snapchatImage = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.snapchatImage.src = "./assets/images/snapchat/snap2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapchatImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
    }
}
class HomeGoodDialogueOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/HomeBedroom2.jpg";
        this.youCharacterImage = new Image();
        this.youCharacterImage.src = './assets/images/characters/karakter2.png';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `${this.name}: Zo, nu ik nog over dat feestje nadenk, had ik wel de goede keuze gemaakt?`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `Is Kees het wel waard?`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Je besluit Kees toe te voegen. (toets 1)", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Je besluit iets anders te doen. (toets 2)", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class HomeGoodEnding extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/HomeBedroom2.jpg";
        this.youCharacterImage = new Image();
        this.youCharacterImage.src = './assets/images/characters/karakter2.png';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je besluit te gaan slapen.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeGoodFollowUpOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/HomeBedroom2.jpg";
        this.youCharacterImage = new Image();
        this.youCharacterImage.src = './assets/images/characters/karakter2.png';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je zegt welterusten tegen je ouders beneden en je gaat naar je kamer ", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: O ja, ik moet Emily nog de foto's van het feestje sturen`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Ik verveel me dood. Snapchat tijd!`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class HomeGoodFollowUpTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/HomeBedroom2.jpg";
        this.youCharacterImage = new Image();
        this.youCharacterImage.src = './assets/images/characters/karakter2.png';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "3 UUR LATER", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeIntroScene extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je bent op je kamer en je start snapchat op", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeNeutralEnding extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.snapImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.snapImage.src = "./assets/images/attributes/snap4.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Nadat je heel de avond met Kees gesnapt hebt, besluit je te gaan slapen.", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Je spreekt hem morgen op school wel weer.", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 30);
    }
}
class HomeNeutralFollowUpOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.35, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je ziet dat Kees je toegevoegd heeft op Snapchat.", this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, "Oh, dat is Kees van het feestje, laat ik hem ook toevoegen. (Toets 1)", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Je besluit de melding te negeren. (Toets 2)", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "Je besluit zijn Snapchat te blokkeren. (Toets 3)", this.canvas.width / 2, this.canvas.height - 30);
    }
}
class HomeNeutralFollowUpTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Nadat je een tijdje in je bed ligt krijg je opeens een berichtje op Snapchat van Kees", this.canvas.width / 2, this.canvas.height - 120);
        this.writeTextToCanvas(ctx, "Hmm, misschien ga ik toch met hem chatten, hij leek wel aardig op het feestje dus. (Toets 1)", this.canvas.width / 2, this.canvas.height - 80);
        this.writeTextToCanvas(ctx, "Je besluit het berichtje te negeren. (Toets 2)", this.canvas.width / 2, this.canvas.height - 40);
    }
}
class HomeNeutralSnapFour extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.snapImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.snapImage.src = "./assets/images/attributes/snap4.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeNeutralSnapOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.snapImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.snapImage.src = "./assets/images/attributes/snap1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeNeutralSnapThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.snapImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.snapImage.src = "./assets/images/attributes/snap3.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class HomeNeutralSnapTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.snapImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/homeBedroom2.png';
        this.snapImage.src = "./assets/images/attributes/snap2.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.snapImage, this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class SchoolBadPartOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je komt aan op school en ziet Emily lopen.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class SchoolBadPartThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `Je loopt door je school, overal zie je mensen lachen`, this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `${this.name}: Zucht... Dit is de stomste dag ooit`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Je hebt gym en niemand wil je in z'n team, je wordt compleet buitengesloten", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: Wat heb ik gedaan? Ik ben zo stom geweest....`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Misschien volgend jaar maar naar een andere school...`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolBadPartTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `Emily: ${this.name}, Hoe stom ben jij? Hoe kon je dat nou doen?`, this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `${this.name}: Hoe bedoel je?`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Emily: Je naaktfoto's, heel de school heeft ze, iedereen lacht je uit", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: Wat? Nee.. Dat meen je niet toch?`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `Emily: Ja, dat meen ik wel, ik wil ook niet meer met je gezien worden, raar kind.`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodDialogue1 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.35, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emily: Zie, ik heb een goede vriendschap met een paar ouderejaars.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Emily: Na school gaan we naar de bar en ze vonden het fijn als misschien jij meeging.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Emily: Leuk toch? Die coole gasten zien ons wel zitten, hoor. Wil je graag mee?", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Besluit om met Emily mee te gaan (Toets 1)", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Besluit om niet met Emily mee te gaan (Toets 2)", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodDialogue1Part2 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emily: Nee? Je wilt niet mee? Maar waarom?", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Die jongens zijn absoluut niet te vertrouwen. (toets 1)", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Weet je, we gaan wel erg vaak uit. (toets 2)", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Ik heb er geen zin in. (toets 3)", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodDialogue1Part3 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.7, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `${this.name}: Misschien zijn we hier te ver mee gegaan.`, this.canvas.width / 2, this.canvas.height - 290);
        this.writeTextToCanvas(ctx, `${this.name}: We doen 100.000 dingen per dag, en geen enkel ding is productief.`, this.canvas.width / 2, this.canvas.height - 250);
        this.writeTextToCanvas(ctx, `${this.name}: We letten nooit op in de les, we doen weinig huiswerk, we leren nooit...`, this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `${this.name}: Wij zijn slordig en onvoorzichtig geworden`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `en we doen niks anders dan bij ouderejaars hangen.`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Emily: ...Ja. We zouden zeker een stuk meer aan school moeten doen.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Laten we dan samen thuis studeren voor de toetsweek in plaats van naar een bar gaan.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodDialogue2 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.55, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "De volgende dag maak je de toets. Jij en Emily hebben een goed gevoel erover.", this.canvas.width / 2, this.canvas.height - 250);
        this.writeTextToCanvas(ctx, `Emily: Zoals afgesproken, sturen we nu het filmpje naar iedereen.`, this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `${this.name}: Een deel van me hoopt dat Kees spijt heeft,`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `maar ik denk niet dat hij dat heeft. Stuur het maar.`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Emily: Wil je de politie erbij betrekken?", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `Betrek de politie erbij. (Toets 1)`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, `Laat het bij je klasgenoten en vrienden (Toets 2)`, this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodEnding1 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.35, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Een week later wordt Kees geschorst en er gaan geruchten rond dat hij naar de gevangenis moet.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Emily en jij hebben een dikke voldoende voor de toets en gaan sowieso over dit jaar naar Klas 2.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Iedereen die het filmpje gezien heeft, vinden jou en Emily heel dapper", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "en al heel snel heb je vele goede vrienden", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Je eindigt het jaar met goede cijfers, goede vrienden en zo trots als een pauw.", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodEnding2 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Een week later wordt Kees in elkaar geslagen door een groep onbekende derdeklassers", this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, "die het filmpje gezien hebben.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Emily en jij hebben een dikke voldoende voor de toets en gaan sowieso over dit jaar naar Klas 2.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Iedereen die het filmpje gezien heeft, vinden jou en Emily heel dapper", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "en al heel snel heb je vele goede vrienden", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Je eindigt het jaar met goede cijfers, goede vrienden en zo trots als een pauw.", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodIntro extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/frontofschoolbackground.jpg';
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je wordt wakker, rolt over en staat op.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Je maakt je klaar voor school en even later vertrek je.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Je komt aan op school.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodPart1 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "De eerste les van vandaag is wiskunde, waarbij je naast Emily zit.", this.canvas.width / 2, this.canvas.height / 2);
        this.writeTextToCanvas(ctx, "Emily: Zo, gisteren was wel een leuk feestje, toch?", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: Dat was het zeker.`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Emily: Hé, na schooltijd kunnen we nog wel iets anders doen als gisteren zo leuk was.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodPart2 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Na een lange schooldag met hard werken, naar de muur staren en", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "niet zeker weten wat 'prend du temps' betekent, lopen jullie naar huis.", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 30);
    }
}
class SchoolGoodPart3 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emily: Hé, stop even. Dit is de huis van één van mijn mama's vrienden", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "en ik kijk even of alles op slot is. Wacht op me.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Is goed, ik wacht wel heel even.`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodPart4 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.keesImage.src = "./assets/images/characters/Kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.keesImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Een paar seconden nadat Emily verdwijnt, komt die jongen van het feestje aanlopen.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Hij nadert agressief en zijn gezicht leest helvuur af. Je schrikt van zijn houding.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `Kees: Ik zou maar hier blijven staan, ${this.name}! Wij zijn nog niet klaar.`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodPart5 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.keesImage.src = "./assets/images/characters/Kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.keesImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.35, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Iets aan de manier waarop hij dat zei klopt niet helemaal.", this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `${this.name}: Waar heb je het over? Waarom ben je zo boos?`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `Kees: Je hebt me genegeerd, luisterde niet naar me en gedraagde je als een rotkind.`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Kees: Ik verdien dit soort behandeling niet van een kreng zoals jij en ik ga jou eens een lesje leren.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodPart6 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.keesImage.src = "./assets/images/characters/Kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.keesImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.55, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Voordat je je realiseert wat er gebeurt,", this.canvas.width / 2, this.canvas.height - 250);
        this.writeTextToCanvas(ctx, "heeft Kees zijn handen om jouw keel terwijl hij je tegen de muur drukt.", this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `Kees: Kijk niet zo naar me, ${this.name}. Dit is jouw eigen schuld!`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `Je had me maar een kans moeten geven.`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `Terwijl alles langzaam zwart wordt voor je ogen,`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `geef je Kees een wanhopige trap met jouw hiel tegen zijn borstkas`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodPart7 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.keesImage.src = "./assets/images/characters/Kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.keesImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.7, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "De overweldigende druk van jouw keel en nek verdwijnt plots", this.canvas.width / 2, this.canvas.height - 290);
        this.writeTextToCanvas(ctx, "en Kees wankelt 2 stappen naar achter door jouw onverwachte reactie.", this.canvas.width / 2, this.canvas.height - 250);
        this.writeTextToCanvas(ctx, "Kees bukt voorover en grijpt naar zijn borst, alsof alle lucht uit zijn longen was gedwongen.", this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `${this.name}: Emily! Help!`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `*Je rent hoestend en met wazig zicht naar Emily toe*`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Je ziet opeens helder", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "en ziet Emily met een telefoon-camera gericht in de richting waar je vandaan kwam.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodPart8 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Het blijkt dat Kees ook Emily gezien heeft. Kees besluit het op een lopen te zetten en rent ervandoor.", this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `Emily: Oh mijn god ben je OK, ${this.name}?!`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `${this.name}: *KUCH KUCH* Ik... denk het wel. Hij probeerde me te wurgen!`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Emily: Ik weet wat je denkt. Normaal zou niemand ons geloven omdat hij zo populair is...", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Maar ik heb alles opgenomen...", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodPart9 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/street.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `${this.name}: Wat? Je hebt het opgenomen maar deed niks?`, this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `Emily: Sorry ${this.name}, ik was heel erg geschokt en dacht niet na.`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, `${this.name}: Ah, het geeft niks. Je hebt bewijs dat hij me aanvalde en ik ben nog heelhuids... amper.`, this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Emily: Ik heb een slim idee. Beter sturen we dit naar iedereen, zodat iedereen ziet wat hij echt is.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Kom, we studeren thuis en doen die toets, dan sturen we het filmpje.`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolGoodTheEnd extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/klaslokaal1.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "HET EINDE", this.canvas.width / 2, this.canvas.height / 2);
    }
}
class SchoolNeutralPartEight extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "https://www.toronto.ca/wp-content/uploads/2017/11/9119-Temporary-on-street.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emily: Kom je bij mij thuis leren? Het wordt wel eens tijd hahaha.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Ja, denk dat dat wel slim is. (toets 1)", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Nee, ik ga liever in m'n eentje leren. (toets 2)", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Je besluit terug naar Kees te gaan om te zeggen dat je toch naar de bar gaat. (toets 3)", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolNeutralPartFive extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/street.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Na een lange lesdag loop je met Emily terug naar huis.", this.canvas.width / 2, this.canvas.height - 80);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN.", this.canvas.width / 2, this.canvas.height - 40);
    }
}
class SchoolNeutralPartFour extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.35, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `${this.name}: Is dat wel zo'n slim idee Emily? We zijn pas 13.`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Emily: Tja, ik denk dat je gelijk hebt. Ik had sowieso al niet zo veel zin, daarom vroeg ik jou mee.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, `${this.name}: Gelukkig, ik dacht even dat je het oneens met me zou zijn.`, this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Emily: Nee joh, we zijn toch vrienden.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN.", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolNeutralPartOne extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je komt aan op school en ziet Emily lopen.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class SchoolNeutralPartSeven extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/street.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.keesImage = new Image();
        this.keesImage.src = "./assets/images/characters/Kees1.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, 100, 0);
        this.ctx.drawImage(this.youImage, -300, 0);
        this.ctx.drawImage(this.keesImage, -600, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emily: Nee Kees, wij hebben nog een toets morgen.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Kees: Oh, oké, laat maar zitten dan.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Kees loopt weg en jij en Emily lopen weer terug naar huis.", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN.", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolNeutralPartSix extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/street.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.keesImage = new Image();
        this.keesImage.src = "./assets/images/characters/Kees1.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, 100, 0);
        this.ctx.drawImage(this.youImage, -300, 0);
        this.ctx.drawImage(this.keesImage, -600, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.50, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Jij en Emily komen Kees tegen op straat.", this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `Kees: ${this.name}, ik heb je niet meer gezien op school vandaag,`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "maar heb je zin om vanavond mee naar de bar te gaan?", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Nee, ik ga liever niet naar de bar. (toets 1)", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Je zegt niks. (toets 2)", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Uhm, ja hoor. (toets 3)", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolNeutralPartThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emily: Wil je vanavond anders met me mee naar de bar? Ik ga met een paar oudere jaars.", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "Ja hoor, lijkt me leuk. (toets 1)", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "Is dat wel zo'n slim idee?. (toets 2)", this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "Nee, eigenlijk liever niet. (toets 3)", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolNeutralPartTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/startscreen2.jpg";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
        this.emilyImage = new Image();
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage = new Image();
        this.youImage.src = "./assets/images/characters/karakter2.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `Emily: Hey ${this.name}, wat was het leuk he gister op het feestje.`, this.canvas.width / 2, this.canvas.height - 210);
        this.writeTextToCanvas(ctx, `${this.name}: Ja zeker, ik heb later die avond ook nog met Kees gesnapped.`, this.canvas.width / 2, this.canvas.height - 170);
        this.writeTextToCanvas(ctx, "Emily: Oh ja, Kees... ik vind hem een beetje raar,", this.canvas.width / 2, this.canvas.height - 130);
        this.writeTextToCanvas(ctx, "maar ik ken hem niet zo goed dus misschien is hij wel anders dan ik in gedachten heb.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, `${this.name}: Tja...`, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 10);
    }
}
class SchoolPartyFollowUpBad extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/background/partybackground.jpg";
        this.characterImage = new Image();
        this.characterImage.src = "./assets/images/characters/Kees1.png";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.55, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je kijkt naar hem, geeft hem een glimlach", this.canvas.width / 2, this.canvas.height / 2 - 20, 50);
        this.writeTextToCanvas(ctx, "en geeft hem je snapchat.", this.canvas.width / 2, this.canvas.height / 2 + 20, 50);
        this.writeTextToCanvas(ctx, `${this.name}: Je mag hem alleen hebben als je belooft dat je niet zal lachen `, this.canvas.width / 2, this.canvas.height - 230);
        this.writeTextToCanvas(ctx, "Hij: Ja oke, ik beloof dat ik niet zal lachen. ", this.canvas.width / 2, this.canvas.height - 190);
        this.writeTextToCanvas(ctx, `${this.name}: Oke vooruit dan maar, alsjeblieft`, this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, `${this.name}: Hey maar mijn ma is er dus ik ga naar huis`, this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Hij: Ja sgoed, spreek je op snap", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 30);
    }
}
class SchoolPartyFollowUpSnapCutscene extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/attributes/SnapchatToegevoegd.png";
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Hij voegt je toe.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class SchoolPartyEnding extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "./assets/images/attributes/RARRI.png";
        this.moederCharacterImage = new Image();
        this.moederCharacterImage.src = './assets/images/characters/moeder1.png';
        this.youCharacterImage = new Image();
        this.youCharacterImage.src = './assets/images/characters/karakter2.png';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je moeder rijdt je naar huis.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class SchoolPartyFollowUpGood extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.keesImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.65, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je zegt nee en wijst hem af", this.canvas.width / 2, this.canvas.height / 2, 50);
        this.writeTextToCanvas(ctx, `${this.name}: Nee, ik ken je nog niet goed genoeg, dus ik wil je mijn snap niet geven`, this.canvas.width / 2, this.canvas.height - 270);
        this.writeTextToCanvas(ctx, "Hij: Wat? Hoezo niet? We dansen toch al heel de avond, wat doe je stom?", this.canvas.width / 2, this.canvas.height - 230);
        this.writeTextToCanvas(ctx, `${this.name}: Ja sorry hoor, ik geef mijn snap gewoon niet aan mensen die ik niet ken,`, this.canvas.width / 2, this.canvas.height - 190);
        this.writeTextToCanvas(ctx, `is dat een probleem ofzo?`, this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, "Hij: Ja, dat is een probleem ja, je kent me toch? Maar laat maar zitten, rotkind dat je bent.", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Ik snap dat je vriendloos bent.", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 30);
    }
}
class SchoolPartyFollowUpGoodPartThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.keesImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.45, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je loopt naar hem toe en probeert je excuses aan te bieden", this.canvas.width / 2, this.canvas.height / 2, 50);
        this.writeTextToCanvas(ctx, `${this.name}: Hey sorry, het spijt me, ik reageerde te snel, wil je alsnog mijn snap?`, this.canvas.width / 2, this.canvas.height - 190);
        this.writeTextToCanvas(ctx, "Hij: hmmmm, weet ik niet hoor, even goed over nadenken...", this.canvas.width / 2, this.canvas.height - 150);
        this.writeTextToCanvas(ctx, `${this.name}: a kom op, alsjeblieft`, this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Hij: Oké dan, hier, voeg me maar toe", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 30);
    }
}
class SchoolPartyFollowUpGoodPartTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.keesImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.keesImage.src = "./assets/images/characters/kees1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je kijkt raar op. Ik, een loser?", this.canvas.width / 2, this.canvas.height / 2 - 30, 50);
        this.writeTextToCanvas(ctx, "Heb ik wel de goede keuze gemaakt?", this.canvas.width / 2, this.canvas.height / 2 + 30, 50);
        this.writeTextToCanvas(ctx, "Ga naar hem, bied je excuses aan en geef je snapchat (toets 1) ", this.canvas.width / 2, this.canvas.height - 120);
        this.writeTextToCanvas(ctx, "Nee, ik vertrouw hem echt niet (toets 2). ", this.canvas.width / 2, this.canvas.height - 80);
        this.writeTextToCanvas(ctx, "ik geef hem mijn snap, als ik hem niet mag verwijder ik hem gewoon (toets 3)", this.canvas.width / 2, this.canvas.height - 40);
    }
}
class SchoolPartyFollowUpGoodPartFive extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.momImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/attributes/RARRI.png';
        this.momImage.src = "./assets/images/characters/moeder1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.momImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, `Mama: Hey ${this.name}, hoe was het feestje?`, this.canvas.width / 2, this.canvas.height / 2 - 140);
        this.writeTextToCanvas(ctx, `${this.name}: Meh was wel leuk, er was één zo'n gast bij die mij om mijn snapchat vroeg`, this.canvas.width / 2, this.canvas.height / 2 - 100);
        this.writeTextToCanvas(ctx, "Mama: Heb je het gegeven aan hem?", this.canvas.width / 2, this.canvas.height / 2 - 60);
        this.writeTextToCanvas(ctx, `${this.name}: Nee, heb hem niet gegeven, kende hem nog maar net en ik vertrouwde hem niet zo erg`, this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.writeTextToCanvas(ctx, "Mama: Ah joh, weet je, je kan hem altijd geven.", this.canvas.width / 2, this.canvas.height / 2 + 20);
        this.writeTextToCanvas(ctx, "Het maakt niet zo veel uit, of je zoiets aan iemand geeft, ", this.canvas.width / 2, this.canvas.height / 2 + 60);
        this.writeTextToCanvas(ctx, "zolang je er maar verstandig mee omgaat.", this.canvas.width / 2, this.canvas.height / 2 + 100);
        this.writeTextToCanvas(ctx, `${this.name}: Oh, serieus? Dat wist ik niet, goed om te weten`, this.canvas.width / 2, this.canvas.height / 2 + 140);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class SchoolPartyFollowUpGoodPartFour extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.momImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.momImage.src = "./assets/images/characters/moeder1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.momImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Je besluit ervoor om je snapchat toch niet te geven,", this.canvas.width / 2, this.canvas.height / 2 - 60, 50);
        this.writeTextToCanvas(ctx, "Op dat punt stuurt je moeder je een appje dat ze buiten staat", this.canvas.width / 2, this.canvas.height / 2, 50);
        this.writeTextToCanvas(ctx, "Je stapt in de auto", this.canvas.width / 2, this.canvas.height / 2 + 60, 50);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class SchoolPartyFirstDialogue extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "*Je staat te dansen met een jongen en hij gaat tegen je praten*", this.canvas.width / 2, this.canvas.height / 2 - 40, 45);
        this.writeTextToCanvas(ctx, "*Hij stelt zich voor als Kees Meerschal,", this.canvas.width / 2, this.canvas.height / 2, 45);
        this.writeTextToCanvas(ctx, "leunt naar je toe en vraagt je snapchat*", this.canvas.width / 2, this.canvas.height / 2 + 40, 45);
        this.writeTextToCanvas(ctx, "Je geeft je snap(toets 1)", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Je zegt niks (toets 2)", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "Je geeft hem je snap niet en wijst hem af (toets 3)", this.canvas.width / 2, this.canvas.height - 30);
    }
}
class SchoolParty extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.dialogueBar = new Image();
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "FEESTSCENE", this.canvas.width / 2, this.canvas.height / 2, 140);
        this.writeTextToCanvas(ctx, 'Je bent op een feestje met Emily en wat mensen van school', this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
class SchoolPartyFollowUpNeutral extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, 'Je zegt niks', this.canvas.width / 2, this.canvas.height / 2, 50);
        this.writeTextToCanvas(ctx, "Emily: Hey, valt deze jongen je soms lastig?", this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, "Ja, eigenlijk wel. (toets 1)", this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, "Nee hoor. (toets 2)", this.canvas.width / 2, this.canvas.height - 30);
    }
}
class SchoolPartyFollowUpNeutralBad1 extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/partybackground.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -400, 0);
        this.ctx.drawImage(this.youImage, 0, 0);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, 'Nee hoor, ik sta al heel de avond met hem te praten.', this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, 'Je geeft je Snap aan Kees.', this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, 'DRUK OP SPATIE OM VERDER TE GAAN', this.canvas.width / 2, this.canvas.height - 30);
    }
}
class SchoolPartyFollowUpNeutralPartThree extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/barbackground.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, 'Nadat je wat gedronken hebt met Emily, stuurt je moeder een berichtje.', this.canvas.width / 2, this.canvas.height - 110);
        this.writeTextToCanvas(ctx, 'Ze staat te wachten om naar huis te gaan.', this.canvas.width / 2, this.canvas.height - 70);
        this.writeTextToCanvas(ctx, 'DRUK OP SPATIE OM VERDER TE GAAN', this.canvas.width / 2, this.canvas.height - 30);
    }
}
class SchoolPartyFollowUpNeutralPartTwo extends GameScreen {
    constructor(game, canvas, ctx, img, keyboardListener, name) {
        super(game, canvas, ctx, img, keyboardListener, name);
        this.shouldStartLevel = false;
        this.backgroundImage = new Image();
        this.emilyImage = new Image();
        this.youImage = new Image();
        this.dialogueBar = new Image();
        this.backgroundImage.src = './assets/images/background/barbackground.jpg';
        this.emilyImage.src = "./assets/images/characters/emily1.png";
        this.youImage.src = "./assets/images/characters/karakter2.png";
        this.dialogueBar.src = "./assets/images/background/dialoguebar.png";
    }
    listen(input) {
        if (input.isKeyDown(KeyboardListener.KEY_ENTER)) {
            this.shouldStartLevel = true;
        }
    }
    draw(ctx) {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, 'Je zegt ja', this.canvas.width / 2, this.canvas.height / 2, 50);
        this.ctx.drawImage(this.emilyImage, -200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.youImage, 200, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.dialogueBar, 0, this.canvas.height / 1.25, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Emily: Oké, kom, dan gaan we wat drinken.", this.canvas.width / 2, this.canvas.height - 90);
        this.writeTextToCanvas(ctx, "DRUK OP SPATIE OM VERDER TE GAAN", this.canvas.width / 2, this.canvas.height - 50);
    }
}
//# sourceMappingURL=app.js.map