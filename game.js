  const canvas = document.getElementById("game");
        const ctx = canvas.getContext("2d");

        const box = 20;
        let score = 0;
        canvas.width =400;
        canvas.height=400;
        canvas.width =window.innerWidth;
        canvas.height=window.innerHeight;


        let snake = [{ x: 12 * box, y: 13 * box }];
        let food = {
            x: Math.floor(Math.random() * 25 + 2) * box,
            y: Math.floor(Math.random() * 25 + 2) * box,
        };
        let canvasSize = Math.floor(window.innerWidth * 0.9 / box) * box;

canvas.width = canvasSize;
canvas.height = canvasSize;
        let direction = "RIGHT";
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});
        function setDirection(newDir) {
  if (newDir === "UP" && direction !== "DOWN") direction = "UP";
  else if (newDir === "DOWN" && direction !== "UP") direction = "DOWN";
  else if (newDir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  else if (newDir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}  

        

        function draw() {
            
            const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.5; // optional volume
bgMusic.play();
            ctx.clearRect(0, 0, canvas.width, canvas.height);


            for (let i = 0; i < snake.length; i++) {

                ctx.beginPath();
                ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2.2, 0, 2 * Math.PI);
                ctx.fillStyle = i === 0 ? "#ff9800" : "#4caf50"; // Head = orange, body = green
                ctx.fill();
                ctx.closePath();
                
                let isBlinking = false;
                setInterval(() => {
                    isBlinking = true;
                    setTimeout(() => {
                        isBlinking = false;
                    }, 150); // Blink lasts 150 ms
                }, 4000); // Blinks every 4 seconds
                // 3D-style snake body (simulate shading)
                let gradient = ctx.createLinearGradient(snake[i].x, snake[i].y, snake[i].x + box, snake[i].y + box);
                gradient.addColorStop(0, "#ff9800");     // Light side
                gradient.addColorStop(1, "#087f23");     // Dark side
                ctx.fillStyle = gradient;
                ctx.fillRect(snake[i].x, snake[i].y, box, box);

                // Shadow
                ctx.shadowColor = "black";
                ctx.shadowBlur = 5;
                 
                if (i === 0) {
                    if (!isBlinking) {
                        // Eyes open (normal)
                        // Left Eye
                        ctx.beginPath();
                        ctx.arc(snake[i].x + box * 0.35, snake[i].y + box * 0.35, 3, 0, 2 * Math.PI);
                        ctx.fillStyle = "white";
                        ctx.fill();

                        // Right Eye
                        ctx.beginPath();
                        ctx.arc(snake[i].x + box * 0.65, snake[i].y + box * 0.35, 3, 0, 2 * Math.PI);
                        ctx.fillStyle = "white";
                        ctx.fill();

                        // Pupils
                        ctx.beginPath();
                        ctx.arc(snake[i].x + box * 0.35, snake[i].y + box * 0.35, 1.5, 0, 2 * Math.PI);
                        ctx.fillStyle = "black";
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(snake[i].x + box * 0.65, snake[i].y + box * 0.35, 1.5, 0, 2 * Math.PI);
                        ctx.fillStyle = "black";
                        ctx.fill();
                    } else {
                        // Eyes closed (blink = horizontal lines)
                        ctx.beginPath();
                        ctx.moveTo(snake[i].x + box * 0.3, snake[i].y + box * 0.35);
                        ctx.lineTo(snake[i].x + box * 0.4, snake[i].y + box * 0.35);
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 2;
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(snake[i].x + box * 0.6, snake[i].y + box * 0.35);
                        ctx.lineTo(snake[i].x + box * 0.7, snake[i].y + box * 0.35);
                        ctx.stroke();
                    }
                }

                if (i === 0) {
                    // Draw smile (curved mouth)
                    ctx.beginPath();
                    ctx.arc(snake[i].x + box / 2, snake[i].y + box * 0.65, 5, 0, Math.PI); // half circle
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    // Left blush
                    ctx.beginPath();
                    ctx.arc(snake[i].x + box * 0.25, snake[i].y + box * 0.6, 2.5, 0, 2 * Math.PI);
                    ctx.fillStyle = "#ff5722"; // pink blush
                    ctx.fill();

                    // Right blush
                    ctx.beginPath();
                    ctx.arc(snake[i].x + box * 0.75, snake[i].y + box * 0.6, 2.5, 0, 2 * Math.PI);
                    ctx.fillStyle = "#ff5722";
                    ctx.fill();
                }

            }
             // Draw circular red food
                    const foodImg = new Image();
                          foodImg.src = "biryani.png"; 
                          ctx.drawImage(foodImg, food.x, food.y, box, box);// Your food image path
            let headX = snake[0].x;
            let headY = snake[0].y;

            if (direction === "LEFT") headX -= box;
            if (direction === "RIGHT") headX += box;
            if (direction === "UP") headY -= box;
            if (direction === "DOWN") headY += box;

            // Game over: wall collision
            if (
                headX < 0 || headX >= canvas.width ||
                headY < 0 || headY >= canvas.height
            ) {
                clearInterval(game);
                document.getElementById("gameover-sound").play();
                 bgMusic.pause();

                
                
                return;
            }

            // Game over: self-collision
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === headX && snake[i].y === headY) {
                    clearInterval(game);

                    alert("Game Over! Your score: " + score);
                    return;
                }
            }

            let newHead = { x: headX, y: headY };

            // Eat food
            if (headX === food.x && headY === food.y) {
                score++;
                 document.getElementById("eat-sound").play();
                  
                document.getElementById("score").textContent = score;

                food = {
                    x: Math.floor(Math.random() * 25 + 2) * box,
                    y: Math.floor(Math.random() * 25 + 2) * box
                };
                
            } else {
                snake.pop();
            }

            snake.unshift(newHead);
            
            
        }
        
        const game = setInterval(draw, 200);
        