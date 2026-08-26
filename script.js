// =====================================================
// CATCH THE BALL
// COMPLETE UPDATED GAME JS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // ELEMENTS
    // =================================================

    const startScreen = document.getElementById("startScreen");
    const gameScreen = document.getElementById("gameScreen");
    const howToPlayScreen = document.getElementById("howToPlayScreen");
    const settingsScreen = document.getElementById("settingsScreen");
    const pauseScreen = document.getElementById("pauseScreen");
    const gameOverScreen = document.getElementById("gameOverScreen");

    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const menuButton = document.getElementById("menuButton");

    const pauseButton = document.getElementById("pauseButton");
    const resumeButton = document.getElementById("resumeButton");

    const soundButton = document.getElementById("soundButton");

    const howToPlayButton = document.getElementById("howToPlayButton");
    const settingsButton = document.getElementById("settingsButton");

    const closeHowToPlay = document.getElementById("closeHowToPlay");
    const closeSettings = document.getElementById("closeSettings");

    const settingsSoundButton =
        document.getElementById("settingsSoundButton");

    const vibrationButton =
        document.getElementById("vibrationButton");

    const resetScoreButton =
        document.getElementById("resetScoreButton");

    const easyButton = document.getElementById("easyButton");
    const mediumButton = document.getElementById("mediumButton");
    const hardButton = document.getElementById("hardButton");

    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");

    const gameArea = document.getElementById("gameArea");

    const ball = document.getElementById("ball");
    const basket = document.getElementById("basket");
    const coin = document.getElementById("coin");
    const goldenBall = document.getElementById("goldenBall");
    const powerUp = document.getElementById("powerUp");
    const bomb = document.getElementById("bomb");
    const diamond = document.getElementById("diamond");
    const lightning = document.getElementById("lightning");

    const scoreText = document.getElementById("score");
    const coinsText = document.getElementById("coins");
    const highScoreText = document.getElementById("highScore");
    const levelText = document.getElementById("level");
    const livesText = document.getElementById("lives");
    const timerText = document.getElementById("timer");
    const comboText = document.getElementById("combo");

    const menuHighScore =
        document.getElementById("menuHighScore");

    const comboDisplay =
        document.getElementById("comboDisplay");

    const catchMessage =
        document.getElementById("catchMessage");

    const powerStatus =
        document.getElementById("powerStatus");

    const powerIcon =
        document.getElementById("powerIcon");

    const powerText =
        document.getElementById("powerText");

    const countdownScreen =
        document.getElementById("countdownScreen");

    const countdownNumber =
        document.getElementById("countdownNumber");

    const finalScoreText =
        document.getElementById("finalScore");

    const finalCoinsText =
        document.getElementById("finalCoins");

    const finalLevelText =
        document.getElementById("finalLevel");

    const finalComboText =
        document.getElementById("finalCombo");


    // =================================================
    // GAME VARIABLES
    // =================================================

    let score = 0;
    let coins = 0;
    let lives = 3;
    let level = 1;
    let timer = 60;

    let combo = 0;
    let maxCombo = 0;
    let comboMultiplier = 1;

    let difficulty = "easy";

    let gameRunning = false;
    let paused = false;
    let countdownRunning = false;

    let basketX = 195;

    let ballX = 200;
    let ballY = -50;

    let coinX = 200;
    let coinY = -100;

    let goldenX = 200;
    let goldenY = -100;

    let powerX = 200;
    let powerY = -100;

    let bombX = 200;
    let bombY = -100;

    let diamondX = 200;
    let diamondY = -100;

    let lightningX = 200;
    let lightningY = -100;


    // =================================================
    // GAME SIZE
    // =================================================

    const GAME_WIDTH = 500;
    const GAME_HEIGHT = 600;

    const BASKET_WIDTH = 110;
    const BALL_SIZE = 35;


    // =================================================
    // SPEED
    // =================================================

    let ballSpeed = 5;
    let coinSpeed = 3;

    let goldenSpeed = 4;
    let powerSpeed = 3;


    // =================================================
    // SPECIAL OBJECT STATES
    // =================================================

    let goldenActive = false;
    let powerActive = false;
    let bombActive = false;
    let diamondActive = false;
    let lightningActive = false;


    // =================================================
    // POWER STATES
    // =================================================

    let shieldActive = false;
    let slowActive = false;
    let multiplierActive = false;
    let lightningMultiplier = false;

    let currentPower = null;


    // =================================================
    // SETTINGS
    // =================================================

    let soundEnabled = true;
    let vibrationEnabled = true;


    // =================================================
    // INTERVALS
    // =================================================

    let gameLoop = null;
    let timerInterval = null;
    let countdownInterval = null;


    // =================================================
    // TIMEOUTS
    // =================================================

    let slowTimeout = null;
    let multiplierTimeout = null;
    let lightningTimeout = null;


    // =================================================
    // HIGH SCORE
    // =================================================

    let highScore =
        Number(localStorage.getItem("highScore")) || 0;


    // =================================================
    // DIFFICULTY
    // =================================================

    const difficultySettings = {

        easy: {
            ballSpeed: 4,
            coinSpeed: 2.5,
            goldenSpeed: 3,
            powerSpeed: 2.5,
            timer: 60
        },

        medium: {
            ballSpeed: 6,
            coinSpeed: 3.5,
            goldenSpeed: 4,
            powerSpeed: 3.5,
            timer: 60
        },

        hard: {
            ballSpeed: 8,
            coinSpeed: 4.5,
            goldenSpeed: 5,
            powerSpeed: 4.5,
            timer: 45
        }

    };


    // =================================================
    // INITIAL UI
    // =================================================

    highScoreText.textContent = highScore;
    menuHighScore.textContent = highScore;

    settingsSoundButton.textContent = "ON";
    vibrationButton.textContent = "ON";

    powerStatus.style.display = "none";
    countdownScreen.style.display = "none";


    // =================================================
    // DIFFICULTY
    // =================================================

    easyButton.addEventListener("click", () => {
        selectDifficulty("easy");
    });

    mediumButton.addEventListener("click", () => {
        selectDifficulty("medium");
    });

    hardButton.addEventListener("click", () => {
        selectDifficulty("hard");
    });


    function selectDifficulty(value) {

        difficulty = value;

        easyButton.classList.remove("active");
        mediumButton.classList.remove("active");
        hardButton.classList.remove("active");

        if (value === "easy") {
            easyButton.classList.add("active");
        }

        if (value === "medium") {
            mediumButton.classList.add("active");
        }

        if (value === "hard") {
            hardButton.classList.add("active");
        }
    }


    // =================================================
    // MENU
    // =================================================

    howToPlayButton.addEventListener("click", () => {

        startScreen.style.display = "none";
        howToPlayScreen.style.display = "flex";

    });


    closeHowToPlay.addEventListener("click", () => {

        howToPlayScreen.style.display = "none";
        startScreen.style.display = "flex";

    });


    settingsButton.addEventListener("click", () => {

        startScreen.style.display = "none";
        settingsScreen.style.display = "flex";

    });


    closeSettings.addEventListener("click", () => {

        settingsScreen.style.display = "none";
        startScreen.style.display = "flex";

    });


    // =================================================
    // SOUND
    // =================================================

    function beep(frequency = 600, duration = 0.1) {

        if (!soundEnabled) return;

        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) return;

            const audio = new AudioContext();

            const oscillator =
                audio.createOscillator();

            const gain =
                audio.createGain();

            oscillator.frequency.value =
                frequency;

            oscillator.type = "sine";

            gain.gain.value = 0.05;

            oscillator.connect(gain);
            gain.connect(audio.destination);

            oscillator.start();

            oscillator.stop(
                audio.currentTime + duration
            );

        } catch (error) {

            console.log("Audio unavailable");

        }

    }


    // =================================================
    // VIBRATION
    // =================================================

    function vibrate(pattern = 50) {

        if (
            vibrationEnabled &&
            navigator.vibrate
        ) {

            navigator.vibrate(pattern);

        }

    }


    // =================================================
    // SETTINGS
    // =================================================

    settingsSoundButton.addEventListener("click", () => {

        soundEnabled = !soundEnabled;

        settingsSoundButton.textContent =
            soundEnabled ? "ON" : "OFF";

        soundButton.textContent =
            soundEnabled ? "🔊" : "🔇";

    });


    soundButton.addEventListener("click", () => {

        soundEnabled = !soundEnabled;

        soundButton.textContent =
            soundEnabled ? "🔊" : "🔇";

        settingsSoundButton.textContent =
            soundEnabled ? "ON" : "OFF";

    });


    vibrationButton.addEventListener("click", () => {

        vibrationEnabled =
            !vibrationEnabled;

        vibrationButton.textContent =
            vibrationEnabled ? "ON" : "OFF";

    });


    resetScoreButton.addEventListener("click", () => {

        highScore = 0;

        localStorage.removeItem("highScore");

        highScoreText.textContent = "0";
        menuHighScore.textContent = "0";

        resetScoreButton.textContent = "DONE";

        setTimeout(() => {

            resetScoreButton.textContent = "RESET";

        }, 1000);

    });


    // =================================================
    // START GAME
    // =================================================

    startButton.addEventListener("click", startGame);

    restartButton.addEventListener("click", startGame);


    function startGame() {

        const settings =
            difficultySettings[difficulty];


        clearInterval(gameLoop);
        clearInterval(timerInterval);
        clearInterval(countdownInterval);


        // Reset game
        score = 0;
        coins = 0;
        lives = 3;
        level = 1;
        timer = settings.timer;

        combo = 0;
        maxCombo = 0;
        comboMultiplier = 1;


        ballSpeed = settings.ballSpeed;
        coinSpeed = settings.coinSpeed;
        goldenSpeed = settings.goldenSpeed;
        powerSpeed = settings.powerSpeed;


        gameRunning = false;
        paused = false;
        countdownRunning = false;


        shieldActive = false;
        slowActive = false;
        multiplierActive = false;
        lightningMultiplier = false;


        goldenActive = false;
        powerActive = false;
        bombActive = false;
        diamondActive = false;
        lightningActive = false;


        clearTimeout(slowTimeout);
        clearTimeout(multiplierTimeout);
        clearTimeout(lightningTimeout);


        // UI
        scoreText.textContent = score;
        coinsText.textContent = coins;
        livesText.textContent = lives;
        levelText.textContent = level;
        timerText.textContent = timer;
        comboText.textContent = combo;


        powerStatus.style.display = "none";

        comboDisplay.classList.remove("combo-hot");


        // Basket
        basketX =
            (GAME_WIDTH - BASKET_WIDTH) / 2;

        basket.style.left =
            basketX + "px";


        // Screens
        startScreen.style.display = "none";
        howToPlayScreen.style.display = "none";
        settingsScreen.style.display = "none";
        pauseScreen.style.display = "none";
        gameOverScreen.style.display = "none";

        gameScreen.style.display = "block";


        // Objects
        resetBall();
        resetCoin();

        hideGolden();
        hidePower();
        hideBomb();
        hideDiamond();
        hideLightning();


        startCountdown();

    }


    // =================================================
    // COUNTDOWN
    // =================================================

    function startCountdown() {

        countdownRunning = true;
        gameRunning = false;

        countdownScreen.style.display = "flex";

        let count = 3;

        countdownNumber.textContent = count;


        countdownInterval =
            setInterval(() => {

                count--;

                if (count > 0) {

                    countdownNumber.textContent =
                        count;

                    beep(500);

                }

                else {

                    clearInterval(countdownInterval);

                    countdownNumber.textContent =
                        "GO! 🚀";

                    beep(900, 0.2);

                    setTimeout(() => {

                        countdownScreen.style.display =
                            "none";

                        countdownRunning = false;

                        beginGame();

                    }, 700);

                }

            }, 1000);

    }


    // =================================================
    // BEGIN GAME
    // =================================================

    function beginGame() {

        gameRunning = true;
        paused = false;


        clearInterval(gameLoop);
        clearInterval(timerInterval);


        gameLoop =
            setInterval(() => {

                if (!gameRunning || paused) {
                    return;
                }

                moveBall();
                moveCoin();

                if (goldenActive) {
                    moveGolden();
                }

                if (powerActive) {
                    movePower();
                }

                if (bombActive) {
                    moveBomb();
                }

                if (diamondActive) {
                    moveDiamond();
                }

                if (lightningActive) {
                    moveLightning();
                }

                spawnSpecialObjects();

            }, 30);


        timerInterval =
            setInterval(() => {

                if (!gameRunning || paused) {
                    return;
                }

                timer--;

                timerText.textContent =
                    timer;

                if (timer <= 0) {

                    endGame();

                }

            }, 1000);

    }


    // =================================================
    // BALL
    // =================================================

    function resetBall() {

        ballY = -50;

        ballX =
            Math.random() *
            (GAME_WIDTH - BALL_SIZE);

        ball.style.left =
            ballX + "px";

        ball.style.top =
            ballY + "px";

    }


    function moveBall() {

        ballY += ballSpeed;

        ball.style.top =
            ballY + "px";


        // Check only once when ball reaches basket area
        if (
            ballY >= GAME_HEIGHT - 100
        ) {

            checkBall();

        }

    }


    // =================================================
    // BALL COLLISION
    // =================================================

    function checkBall() {

        const ballLeft = ballX;
        const ballRight =
            ballX + BALL_SIZE;

        const basketLeft =
            basketX;

        const basketRight =
            basketX + BASKET_WIDTH;


        const caught =
            ballRight >= basketLeft &&
            ballLeft <= basketRight;


        if (caught) {

            catchBall();

        }

        else {

            missBall();

        }

    }


    // =================================================
    // CATCH BALL
    // =================================================

    function catchBall() {

        // IMPORTANT:
        // Reset ball immediately so same ball
        // cannot score multiple times.

        resetBall();


        combo++;

        maxCombo =
            Math.max(maxCombo, combo);


        comboMultiplier =
            Math.min(
                5,
                Math.floor(combo / 5) + 1
            );


        let points =
            comboMultiplier;


        // Perfect catch
        const ballCenter =
            ballX + BALL_SIZE / 2;

        const basketCenter =
            basketX + BASKET_WIDTH / 2;


        if (
            Math.abs(
                ballCenter - basketCenter
            ) <= 25
        ) {

            points += 3;

            showMessage(
                "✨ PERFECT! +" + points
            );

            beep(1000);

        }

        else {

            showMessage(
                "🎯 +" + points
            );

            beep(700);

        }


        // Lightning x2
        if (lightningMultiplier) {

            points *= 2;

        }


        // Combo bonus
        if (
            combo > 0 &&
            combo % 5 === 0
        ) {

            points += combo * 2;

            showMessage(
                "🔥 " +
                combo +
                " COMBO! +" +
                points
            );

            beep(1200);

        }


        score += points;

        scoreText.textContent =
            score;

        comboText.textContent =
            combo;


        if (combo >= 5) {

            comboDisplay.classList.add(
                "combo-hot"
            );

        }


        updateHighScore();

        vibrate(30);


        // Level system
        const requiredScore =
            level * 30;


        if (score >= requiredScore) {

            level++;

            levelText.textContent =
                level;


            ballSpeed += 0.5;
            coinSpeed += 0.2;
            goldenSpeed += 0.2;
            powerSpeed += 0.2;


            showMessage(
                "🚀 LEVEL " +
                level
            );

            beep(1100, 0.2);

        }


        // Random golden ball
        if (
            !goldenActive &&
            Math.random() < 0.08
        ) {

            showGolden();

        }

    }


    // =================================================
    // MISS
    // =================================================

    function missBall() {

        if (shieldActive) {

            shieldActive = false;

            updatePowerStatus();

            showMessage(
                "🛡️ SHIELD SAVED YOU!"
            );

            beep(800);

            resetBall();

            return;

        }


        lives--;

        combo = 0;
        comboMultiplier = 1;


        livesText.textContent =
            lives;

        comboText.textContent =
            combo;


        comboDisplay.classList.remove(
            "combo-hot"
        );


        showMessage("💔 MISS!");

        beep(180, 0.2);

        vibrate(100);


        if (lives <= 0) {

            endGame();

        }

        else {

            resetBall();

        }

    }


    // =================================================
    // COIN
    // =================================================

    function resetCoin() {

        coinY = -100;

        coinX =
            Math.random() *
            (GAME_WIDTH - 40);

        coin.style.left =
            coinX + "px";

        coin.style.top =
            coinY + "px";

    }


    function moveCoin() {

        coinY += coinSpeed;

        coin.style.top =
            coinY + "px";


        if (
            coinY >= GAME_HEIGHT - 80
        ) {

            const caught =
                coinX + 35 >= basketX &&
                coinX <= basketX + BASKET_WIDTH;


            if (caught) {

                const earnedCoins =
                    multiplierActive ? 2 : 1;

                coins += earnedCoins;

                coinsText.textContent =
                    coins;

                showMessage(
                    "🪙 +" +
                    earnedCoins
                );

                beep(1000);

            }


            resetCoin();

        }

    }


    // =================================================
    // GOLDEN BALL
    // =================================================

    function showGolden() {

        goldenActive = true;

        goldenY = -50;

        goldenX =
            Math.random() *
            (GAME_WIDTH - 40);


        goldenBall.style.left =
            goldenX + "px";

        goldenBall.style.top =
            goldenY + "px";

        goldenBall.style.display =
            "flex";

    }


    function moveGolden() {

        goldenY += goldenSpeed;

        goldenBall.style.top =
            goldenY + "px";


        if (
            goldenY >= GAME_HEIGHT - 80
        ) {

            if (
                goldenX + 40 >= basketX &&
                goldenX <= basketX + BASKET_WIDTH
            ) {

                let goldenPoints =
                    lightningMultiplier ? 10 : 5;

                score += goldenPoints;

                scoreText.textContent =
                    score;

                updateHighScore();

                showMessage(
                    "🌟 GOLDEN +"
                    + goldenPoints
                );

                beep(1300);

                vibrate(40);

            }

            hideGolden();

        }

    }


    function hideGolden() {

        goldenActive = false;

        goldenBall.style.display =
            "none";

    }


    // =================================================
    // POWER UPS
    // =================================================

    const powerTypes = [

        {
            type: "shield",
            icon: "🛡️"
        },

        {
            type: "life",
            icon: "❤️"
        },

        {
            type: "slow",
            icon: "❄️"
        },

        {
            type: "multiplier",
            icon: "🪙"
        }

    ];


    function showPower() {

        if (powerActive) return;


        currentPower =
            powerTypes[
                Math.floor(
                    Math.random() *
                    powerTypes.length
                )
            ];


        powerActive = true;

        powerY = -50;

        powerX =
            Math.random() *
            (GAME_WIDTH - 45);


        powerUp.textContent =
            currentPower.icon;

        powerUp.style.left =
            powerX + "px";

        powerUp.style.top =
            powerY + "px";

        powerUp.style.display =
            "flex";

    }


    function movePower() {

        powerY += powerSpeed;

        powerUp.style.top =
            powerY + "px";


        if (
            powerY >= GAME_HEIGHT - 80
        ) {

            if (
                powerX + 40 >= basketX &&
                powerX <= basketX + BASKET_WIDTH
            ) {

                activatePower(
                    currentPower.type
                );

            }

            hidePower();

        }

    }


    function hidePower() {

        powerActive = false;

        currentPower = null;

        powerUp.style.display =
            "none";

    }


    function activatePower(type) {

        beep(900);

        vibrate(50);


        if (type === "shield") {

            shieldActive = true;

            showPowerStatus(
                "🛡️",
                "SHIELD ACTIVE"
            );

        }


        if (type === "life") {

            lives =
                Math.min(5, lives + 1);

            livesText.textContent =
                lives;

            showPowerStatus(
                "❤️",
                "+1 LIFE"
            );

        }


        if (type === "slow") {

            if (!slowActive) {

                ballSpeed *= 0.5;
                coinSpeed *= 0.5;
                goldenSpeed *= 0.5;
                powerSpeed *= 0.5;

            }

            slowActive = true;

            showPowerStatus(
                "❄️",
                "SLOW MOTION"
            );


            clearTimeout(slowTimeout);


            slowTimeout =
                setTimeout(() => {

                    ballSpeed *= 2;
                    coinSpeed *= 2;
                    goldenSpeed *= 2;
                    powerSpeed *= 2;

                    slowActive = false;

                    updatePowerStatus();

                }, 7000);

        }


        if (type === "multiplier") {

            multiplierActive = true;

            showPowerStatus(
                "🪙",
                "COINS x2"
            );


            clearTimeout(
                multiplierTimeout
            );


            multiplierTimeout =
                setTimeout(() => {

                    multiplierActive = false;

                    updatePowerStatus();

                }, 10000);

        }

    }


    // =================================================
    // POWER STATUS
    // =================================================

    function showPowerStatus(icon, text) {

        powerStatus.style.display =
            "block";

        powerIcon.textContent =
            icon;

        powerText.textContent =
            text;

    }


    function updatePowerStatus() {

        if (shieldActive) {

            showPowerStatus(
                "🛡️",
                "SHIELD ACTIVE"
            );

            return;

        }

        if (slowActive) {

            showPowerStatus(
                "❄️",
                "SLOW MOTION"
            );

            return;

        }

        if (multiplierActive) {

            showPowerStatus(
                "🪙",
                "COINS x2"
            );

            return;

        }

        if (lightningMultiplier) {

            showPowerStatus(
                "⚡",
                "SCORE x2"
            );

            return;

        }

        powerStatus.style.display =
            "none";

    }


    // =================================================
    // SPECIAL OBJECTS
    // =================================================

    function spawnSpecialObjects() {

        if (
            !powerActive &&
            Math.random() < 0.0015
        ) {

            showPower();

        }


        if (
            level >= 2 &&
            !bombActive &&
            Math.random() < 0.002
        ) {

            showBomb();

        }


        if (
            level >= 2 &&
            !diamondActive &&
            Math.random() < 0.0015
        ) {

            showDiamond();

        }


        if (
            level >= 3 &&
            !lightningActive &&
            Math.random() < 0.001
        ) {

            showLightning();

        }

    }


    // =================================================
    // BOMB
    // =================================================

    function showBomb() {

        bombActive = true;

        bombY = -50;

        bombX =
            Math.random() *
            (GAME_WIDTH - 45);

        bomb.style.left =
            bombX + "px";

        bomb.style.top =
            bombY + "px";

        bomb.style.display =
            "flex";

    }


    function moveBomb() {

        bombY += ballSpeed * 0.9;

        bomb.style.top =
            bombY + "px";


        if (
            bombY >= GAME_HEIGHT - 80
        ) {

            if (
                bombX + 40 >= basketX &&
                bombX <= basketX + BASKET_WIDTH
            ) {

                bombHit();

            }

            hideBomb();

        }

    }


    function bombHit() {

        if (shieldActive) {

            shieldActive = false;

            showMessage(
                "🛡️ BOMB BLOCKED!"
            );

            beep(700);

            updatePowerStatus();

            return;

        }


        lives--;

        combo = 0;
        comboMultiplier = 1;


        livesText.textContent =
            lives;

        comboText.textContent =
            combo;


        comboDisplay.classList.remove(
            "combo-hot"
        );


        showMessage(
            "💣 BOOM! -1 LIFE"
        );

        beep(150);

        vibrate(150);


        if (lives <= 0) {

            endGame();

        }

    }


    function hideBomb() {

        bombActive = false;

        bomb.style.display =
            "none";

    }


    // =================================================
    // DIAMOND
    // =================================================

    function showDiamond() {

        diamondActive = true;

        diamondY = -50;

        diamondX =
            Math.random() *
            (GAME_WIDTH - 45);


        diamond.style.left =
            diamondX + "px";

        diamond.style.top =
            diamondY + "px";

        diamond.style.display =
            "flex";

    }


    function moveDiamond() {

        diamondY += ballSpeed * 0.8;

        diamond.style.top =
            diamondY + "px";


        if (
            diamondY >= GAME_HEIGHT - 80
        ) {

            if (
                diamondX + 40 >= basketX &&
                diamondX <= basketX + BASKET_WIDTH
            ) {

                const diamondPoints =
                    lightningMultiplier ? 20 : 10;

                score += diamondPoints;

                coins += 3;

                combo++;

                maxCombo =
                    Math.max(
                        maxCombo,
                        combo
                    );


                scoreText.textContent =
                    score;

                coinsText.textContent =
                    coins;

                comboText.textContent =
                    combo;


                updateHighScore();

                showMessage(
                    "💎 DIAMOND +" +
                    diamondPoints
                );

                beep(1400);

                vibrate(50);

            }

            hideDiamond();

        }

    }


    function hideDiamond() {

        diamondActive = false;

        diamond.style.display =
            "none";

    }


    // =================================================
    // LIGHTNING
    // =================================================

    function showLightning() {

        lightningActive = true;

        lightningY = -50;

        lightningX =
            Math.random() *
            (GAME_WIDTH - 45);


        lightning.style.left =
            lightningX + "px";

        lightning.style.top =
            lightningY + "px";

        lightning.style.display =
            "flex";

    }


    function moveLightning() {

        lightningY += ballSpeed * 0.85;

        lightning.style.top =
            lightningY + "px";


        if (
            lightningY >= GAME_HEIGHT - 80
        ) {

            if (
                lightningX + 40 >= basketX &&
                lightningX <= basketX + BASKET_WIDTH
            ) {

                lightningMultiplier = true;

                showPowerStatus(
                    "⚡",
                    "SCORE x2"
                );

                showMessage(
                    "⚡ SCORE x2!"
                );

                beep(1200);

                vibrate(50);


                clearTimeout(
                    lightningTimeout
                );


                lightningTimeout =
                    setTimeout(() => {

                        lightningMultiplier =
                            false;

                        updatePowerStatus();

                    }, 8000);

            }

            hideLightning();

        }

    }


    function hideLightning() {

        lightningActive = false;

        lightning.style.display =
            "none";

    }


    // =================================================
    // BASKET CONTROLS
    // =================================================

    function moveBasketLeft() {

        if (
            !gameRunning ||
            paused
        ) return;


        basketX -= 30;


        if (basketX < 0) {

            basketX = 0;

        }


        basket.style.left =
            basketX + "px";

    }


    function moveBasketRight() {

        if (
            !gameRunning ||
            paused
        ) return;


        basketX += 30;


        if (
            basketX >
            GAME_WIDTH - BASKET_WIDTH
        ) {

            basketX =
                GAME_WIDTH - BASKET_WIDTH;

        }


        basket.style.left =
            basketX + "px";

    }


    // =================================================
    // KEYBOARD
    // =================================================

    document.addEventListener("keydown", event => {

        if (event.key === "ArrowLeft") {

            event.preventDefault();

            moveBasketLeft();

        }


        if (event.key === "ArrowRight") {

            event.preventDefault();

            moveBasketRight();

        }

    });


    // =================================================
    // MOBILE
    // =================================================

    leftButton.addEventListener(
        "click",
        moveBasketLeft
    );

    rightButton.addEventListener(
        "click",
        moveBasketRight
    );


    // =================================================
    // PAUSE
    // =================================================

    pauseButton.addEventListener("click", () => {

        if (
            !gameRunning ||
            countdownRunning
        ) return;


        paused = true;

        gameScreen.style.display =
            "none";

        pauseScreen.style.display =
            "flex";

    });


    resumeButton.addEventListener("click", () => {

        paused = false;

        pauseScreen.style.display =
            "none";

        gameScreen.style.display =
            "block";

    });


    // =================================================
    // MESSAGE
    // =================================================

    function showMessage(message) {

        catchMessage.textContent =
            message;

        catchMessage.classList.remove(
            "catch-animation"
        );

        void catchMessage.offsetWidth;

        catchMessage.classList.add(
            "catch-animation"
        );

    }


    // =================================================
    // HIGH SCORE
    // =================================================

    function updateHighScore() {

        if (score > highScore) {

            highScore = score;

            highScoreText.textContent =
                highScore;

            menuHighScore.textContent =
                highScore;


            localStorage.setItem(
                "highScore",
                highScore
            );

        }

    }


    // =================================================
    // GAME OVER
    // =================================================

    function endGame() {

        if (!gameRunning) return;


        gameRunning = false;
        paused = false;


        clearInterval(gameLoop);
        clearInterval(timerInterval);
        clearInterval(countdownInterval);


        clearTimeout(slowTimeout);
        clearTimeout(multiplierTimeout);
        clearTimeout(lightningTimeout);


        hideGolden();
        hidePower();
        hideBomb();
        hideDiamond();
        hideLightning();


        finalScoreText.textContent =
            score;

        finalCoinsText.textContent =
            coins;

        finalLevelText.textContent =
            level;

        finalComboText.textContent =
            maxCombo;


        gameScreen.style.display =
            "none";

        pauseScreen.style.display =
            "none";

        gameOverScreen.style.display =
            "flex";

    }


    // =================================================
    // MAIN MENU
    // =================================================

    menuButton.addEventListener("click", () => {

        gameRunning = false;
        paused = false;
        countdownRunning = false;


        clearInterval(gameLoop);
        clearInterval(timerInterval);
        clearInterval(countdownInterval);


        countdownScreen.style.display =
            "none";

        gameScreen.style.display =
            "none";

        pauseScreen.style.display =
            "none";

        gameOverScreen.style.display =
            "none";

        howToPlayScreen.style.display =
            "none";

        settingsScreen.style.display =
            "none";

        startScreen.style.display =
            "flex";


        menuHighScore.textContent =
            highScore;

    });


    // =================================================
    // FIRST BASKET POSITION
    // =================================================

    basket.style.left =
        basketX + "px";


    console.log(
        "🎮 Catch The Ball - Updated Version Loaded!"
    );

});