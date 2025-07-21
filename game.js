// Space Shooter Game

class SpaceShooter {
    constructor(container) {
        this.width = 480;
        this.height = 640;
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        // Game state
        this.state = 'menu'; // 'menu', 'playing', 'gameover'
        this.score = 0;
        this.highScore = 0;

        // Player
        this.player = {
            x: this.width / 2,
            y: this.height - 60,
            w: 40,
            h: 24,
            speed: 5,
            cooldown: 0
        };

        // controls
        this.keys = {};
        this.shootPressed = false;

        // Bullets & enemies
        this.bullets = [];
        this.enemies = [];
        this.enemyCooldown = 0;

        // Starfield
        this.stars = [];
        for (let i = 0; i < 60; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: Math.random() * 1.5 + 0.2,
                speed: Math.random() * 1.5 + 0.3
            });
        }

        // Bindings
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        // Start render loop immediately for menu display
        this.render();
        this.showMenu();
    }

    showMenu() {
        this.state = 'menu';
        this.clearMenu();
        this.menuDiv = document.createElement('div');
        this.menuDiv.className = 'menu';
        this.menuDiv.innerHTML = `
            <h1>SPACE SHOOTER</h1>
            <p style="margin:0 0 14px 0;font-size:1.05em;color:#b9eafe;">Arrow keys to move<br>Space to shoot</p>
            <button id="startGameBtn">START</button>
            <div style="margin-top:14px;font-size:1em;color:#7df;">
                High Score: ${this.highScore}
            </div>
        `;
        this.container.appendChild(this.menuDiv);
        document.getElementById('startGameBtn').onclick = () => this.startGame();
    }

    showGameOver() {
        this.state = 'gameover';
        this.clearMenu();
        this.menuDiv = document.createElement('div');
        this.menuDiv.className = 'menu';
        this.menuDiv.innerHTML = `
            <h1>GAME OVER</h1>
            <p style="font-size:1.2em;color:#fc9;margin-bottom:8px;">Score: ${this.score}</p>
            <div style="margin-bottom:8px;font-size:1em;color:#7df;">High Score: ${this.highScore}</div>
            <button id="restartBtn">RESTART</button>
        `;
        this.container.appendChild(this.menuDiv);
        document.getElementById('restartBtn').onclick = () => this.startGame();
    }

    clearMenu() {
        if (this.menuDiv && this.menuDiv.parentNode) {
            this.menuDiv.parentNode.removeChild(this.menuDiv);
        }
    }

    startGame() {
        // Reset game state
        this.state = 'playing';
        this.score = 0;
        this.bullets = [];
        this.enemies = [];
        this.enemyCooldown = 0;
        this.player.x = this.width / 2;
        this.player.y = this.height - 60;
        this.player.cooldown = 0;
        this.clearMenu();
        // Input listeners
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        // Start game loop
        this.lastTime = performance.now();
        this.render();
    }

    endGame() {
        this.state = 'gameover';
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        if (this.score > this.highScore) this.highScore = this.score;
        this.showGameOver();
    }

    handleKeyDown(e) {
        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight' ||
            e.code === 'ArrowUp' || e.code === 'ArrowDown') {
            this.keys[e.code] = true;
            e.preventDefault();
        }
        if (e.code === 'Space') {
            this.shootPressed = true;
            e.preventDefault();
        }
    }

    handleKeyUp(e) {
        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight' ||
            e.code === 'ArrowUp' || e.code === 'ArrowDown') {
            this.keys[e.code] = false;
            e.preventDefault();
        }
        if (e.code === 'Space') {
            this.shootPressed = false;
            e.preventDefault();
        }
    }

    update(dt) {
        // Update stars
        for (let star of this.stars) {
            star.y += star.speed * dt * 0.09;
            if (star.y > this.height) {
                star.y = 0;
                star.x = Math.random() * this.width;
            }
        }

        // Player movement
        if (this.keys['ArrowLeft']) this.player.x -= this.player.speed;
        if (this.keys['ArrowRight']) this.player.x += this.player.speed;
        if (this.keys['ArrowUp']) this.player.y -= this.player.speed;
        if (this.keys['ArrowDown']) this.player.y += this.player.speed;
        // Boundaries
        this.player.x = Math.max(0, Math.min(this.width - this.player.w, this.player.x));
        this.player.y = Math.max(0, Math.min(this.height - this.player.h, this.player.y));

        // Firing bullets
        if (this.player.cooldown > 0) this.player.cooldown -= dt;
        if (this.shootPressed && this.player.cooldown <= 0) {
            this.bullets.push({
                x: this.player.x + this.player.w/2,
                y: this.player.y,
                dx: 0,
                dy: -9
            });
            this.player.cooldown = 220; // ms
        }

        // Update bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let b = this.bullets[i];
            b.x += b.dx;
            b.y += b.dy;
            if (b.y < -10) this.bullets.splice(i, 1);
        }

        // Spawn enemies
        if (this.enemyCooldown > 0) this.enemyCooldown -= dt;
        else {
            let enemyW = 36, enemyH = 28;
            let ex = 30 + Math.random() * (this.width - 60 - enemyW);
            this.enemies.push({
                x: ex,
                y: -enemyH,
                w: enemyW,
                h: enemyH,
                speed: 1.7 + Math.random() * 1.3,
                hp: 1
            });
            this.enemyCooldown = 600 + Math.random() * 350;
        }

        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            let e = this.enemies[i];
            e.y += e.speed;
            // Remove if off screen
            if (e.y > this.height + 40) this.enemies.splice(i, 1);
        }

        // Bullet-enemy collisions
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            let e = this.enemies[i];
            for (let j = this.bullets.length - 1; j >= 0; j--) {
                let b = this.bullets[j];
                if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
                    this.enemies.splice(i, 1);
                    this.bullets.splice(j, 1);
                    this.score += 10;
                    break;
                }
            }
        }

        // Enemy-player collisions
        for (let e of this.enemies) {
            if (this.rectsOverlap(this.player, e)) {
                this.endGame();
                return;
            }
        }
    }

    rectsOverlap(a, b) {
        return (a.x < b.x + b.w &&
                a.x + a.w > b.x &&
                a.y < b.y + b.h &&
                a.y + a.h > b.y);
    }

    drawShip(ctx, x, y, w, h) {
        // Player ship: cyan triangle/diamond
        ctx.save();
        ctx.translate(x + w/2, y + h/2);
        ctx.scale(w/40, h/24);
        // Body
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(13, 8);
        ctx.lineTo(0, 5);
        ctx.lineTo(-13, 8);
        ctx.closePath();
        ctx.fillStyle = "#66eaff";
        ctx.shadowColor = "#00faff";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Cockpit
        ctx.beginPath();
        ctx.ellipse(0, -1.5, 5, 5, 0, 0, Math.PI*2);
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.45;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    drawEnemy(ctx, x, y, w, h) {
        // Enemy: red oval body, black lines
        ctx.save();
        ctx.translate(x + w/2, y + h/2);
        ctx.scale(w/36, h/28);
        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 15, 9, 0, 0, Math.PI*2);
        ctx.fillStyle = "#f55";
        ctx.shadowColor = "#ff5555aa";
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
        // "Cockpit"
        ctx.beginPath();
        ctx.arc(0, -3, 4, 0, Math.PI*2);
        ctx.fillStyle = "#fff3";
        ctx.fill();
        // "Wings"
        ctx.beginPath();
        ctx.moveTo(-13, 3); ctx.lineTo(-22, 8);
        ctx.moveTo(13, 3); ctx.lineTo(22, 8);
        ctx.strokeStyle = "#900";
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    drawBullet(ctx, x, y) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI*2);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#6cf";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
    }

    drawStarfield(ctx) {
        for (let s of this.stars) {
            ctx.save();
            ctx.globalAlpha = 0.6 + 0.4 * (s.r / 2);
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
        }
    }

    drawUI(ctx) {
        ctx.save();
        // Score
        ctx.font = "bold 20px Segoe UI, Arial";
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#3cf";
        ctx.shadowBlur = 4;
        ctx.fillText("Score: " + this.score, 14, 30);
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    render(now) {
        if (!now) now = performance.now();
        let dt = now - (this.lastTime || now);
        this.lastTime = now;

        // Always draw background and menu/game
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Stars
        this.drawStarfield(this.ctx);

        if (this.state === 'playing') {
            // Update
            this.update(dt);

            // Player
            this.drawShip(this.ctx, this.player.x, this.player.y, this.player.w, this.player.h);

            // Bullets
            for (let b of this.bullets) {
                this.drawBullet(this.ctx, b.x, b.y);
            }

            // Enemies
            for (let e of this.enemies) {
                this.drawEnemy(this.ctx, e.x, e.y, e.w, e.h);
            }

            // UI
            this.drawUI(this.ctx);

            // Continue loop
            requestAnimationFrame(this.render.bind(this));
        } else {
            // In menu/gameover: draw faded ship and UI
            this.ctx.save();
            this.ctx.globalAlpha = 0.3;
            this.drawShip(this.ctx, this.width/2 - 20, this.height - 80, 40, 24);
            this.ctx.restore();
        }
    }
}

// Initialization pattern
function initGame() {
    const container = document.getElementById('gameContainer');
    // Remove any old content (if re-init)
    while(container.firstChild) container.removeChild(container.firstChild);
    new SpaceShooter(container);
}

window.addEventListener('DOMContentLoaded', initGame);