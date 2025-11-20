const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let isGameOver = false;
let score = 0;
//wprowadzamy obrazki
const bgImage = new Image();
bgImage.src = 'assets/Flappy Bird/background-day.png'; 
const baseImage = new Image();
baseImage.src = 'assets/Flappy Bird/base.png';
const pipeImage = new Image();
pipeImage.src = 'assets/Flappy Bird/pipe-green.png';
const birdFrames = [
    new Image(),
    new Image(),
    new Image()
        ]
birdFrames[0].src = 'assets/Flappy Bird/yellowbird-midflap.png';
birdFrames[1].src = 'assets/Flappy Bird/yellowbird-upflap.png';
birdFrames[2].src = 'assets/Flappy Bird/yellowbird-downflap.png';


//logika tworzenia rur
let pipes = [];
const pipeWidth = 52;
const pipeHeight = 320;
const pipeGap = 120;
let pipeTimer = 0;
const pipeInterval = 120;
const pipeSpeed = 2;








// nie wiem ale się dowiem 
let currentFrame = 0; 
let frameCounter = 0;
//fizyka ptaka
const gravity = 0.1; 



const birdWidth = 34; 
const birdHeight = 24; 
let birdX = 50;
let birdY = canvas.height / 2 - birdHeight / 2; 
let birdVelocityY = 0; 


function gameLoop() {
    if (isGameOver) {
        // Tutaj w przyszłości wyświetlimy ekran "Game Over"
        // Możesz dodać prosty tekst na razie:
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", 100, 300);
        return; 
    }
    birdVelocityY += gravity; 
    birdY += birdVelocityY; 


    frameCounter++;
    if (frameCounter % 10 === 0){
        currentFrame = (currentFrame + 1) % birdFrames.length
    } 
    pipeTimer++;

    for (let i = pipes.length - 1; i>= 0; i--) {
        pipes[i].x -= pipeSpeed;

        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i,1);
        }
    }

    if (pipeTimer > pipeInterval) {
        const minHeight = 50;
        const maxHeight = canvas.height - 110 - minHeight - pipeGap;
        const gapY = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

        pipes.push({
            x : canvas.width,
            topY : gapY - pipeHeight,
            bottomY: gapY + pipeGap

        });
    pipeTimer = 0 
    }

    // --- 2. CZYSZCZENIE EKRANU ---
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (checkCollisions()) {
        isGameOver = true;
        // Możesz tu dodać dźwięk 'hit.wav' lub 'die.wav'
    }

    // --- 3. RYSOWANIE ---
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // --- NOWE RYSOWANIE (RURY) ---
    pipes.forEach(pipe => {
        // Rysuj rurę górną (obróconą o 180 stopni)
        // 'pipe-green.png' to rura dolna, więc musimy ją obrócić
        // Zrobimy to przez odwrócenie canvasu
        ctx.save(); // Zapisz stan canvasu
        ctx.translate(pipe.x + pipeWidth / 2, pipe.topY + pipeHeight / 2); // Przesuń do środka rury
        ctx.rotate(Math.PI); // Obróć o 180 stopni (PI radianów)
        ctx.drawImage(pipeImage, -pipeWidth / 2, -pipeHeight / 2); // Rysuj
        ctx.restore(); // Przywróć stan canvasu

        // Rysuj rurę dolną
        ctx.drawImage(pipeImage, pipe.x, pipe.bottomY);
    });


    const baseHeight = 110; 
    ctx.drawImage(baseImage, 0, canvas.height - baseHeight, canvas.width, baseHeight);
    ctx.drawImage(birdFrames[currentFrame], birdX, birdY, birdWidth, birdHeight);

    function checkCollisions() {
    // 1. Kolizja z ziemią [zgodnie z 71]
    const baseHeight = 112; // Wysokość obrazka ziemi
    if (birdY + birdHeight >= canvas.height - baseHeight) {
        return true;
    }

    // 2. Kolizja z rurami [zgodnie z 67]
    for (let i = 0; i < pipes.length; i++) {
        const p = pipes[i];

        // Sprawdzamy, czy ptak jest w poziomie rury (X)
        if (birdX + birdWidth > p.x && birdX < p.x + pipeWidth) {
            
            // Sprawdzamy, czy ptak uderzył w górną LUB dolną rurę (Y)
            // Pamiętaj: pipe.topY to górna krawędź przerwy, a pipe.bottomY to dolna
            
            // Czy dotyka górnej rury? (Ptak jest wyżej niż dolna krawędź górnej rury)
            // Górna rura kończy się na p.topY + pipeHeight
            if (birdY < p.topY + pipeHeight) {
                return true;
            }

            // Czy dotyka dolnej rury? (Ptak jest niżej niż górna krawędź dolnej rury)
            if (birdY + birdHeight > p.bottomY) {
                return true;
            }
        }
    }
    
    return false;
}
     requestAnimationFrame(gameLoop);
}
birdFrames[birdFrames.length - 1].onload = gameLoop;

const jumpStrength = -5;

function jump() {
    birdVelocityY = jumpStrength;

}



document.addEventListener('keydown', function(event)
    {
        if (event.code === 'Space')
            {
            jump();
            }
    }
);
