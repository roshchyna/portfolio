type Obstacle = {
	x: number;
	width: number;
	height: number;
	kind: "bush" | "tree";
};

const canvas = document.querySelector<HTMLCanvasElement>("#runner-canvas");
const scoreElement = document.querySelector<HTMLElement>("#runner-score");
const statusElement = document.querySelector<HTMLElement>("#runner-status");
const jumpButton = document.querySelector<HTMLButtonElement>("#runner-jump");
const restartButton =
	document.querySelector<HTMLButtonElement>("#runner-restart");

const width = 720;
const height = 220;
const groundY = 178;
const playerX = 72;
const playerWidth = 50;
const playerHeight = 42;
const gravity = 1_650;
const jumpVelocity = -590;

let context: CanvasRenderingContext2D | null = null;
let playerY = groundY - playerHeight;
let velocityY = 0;
let obstacles: Obstacle[] = [];
let distance = 0;
let score = 0;
let spawnTimer = 0;
let nextSpawn = 1.15;
let previousTime = 0;
let animationFrame = 0;
let running = false;
let initialized = false;

const drawRunner = () => {
	if (!context) return;

	const stride = Math.floor(distance / 15) % 2;

	// Tail and body
	context.fillStyle = "#7dd3fc";
	context.beginPath();
	context.moveTo(playerX + 12, playerY + 17);
	context.lineTo(playerX - 12, playerY + 25);
	context.lineTo(playerX + 13, playerY + 30);
	context.fill();
	context.fillRect(playerX + 9, playerY + 15, 25, 19);

	// Neck, large head, and snout
	context.fillRect(playerX + 27, playerY + 9, 10, 18);
	context.fillRect(playerX + 30, playerY + 2, 17, 16);
	context.fillRect(playerX + 41, playerY + 7, 9, 10);

	// Eye and open jaw
	context.fillStyle = "#07111f";
	context.fillRect(playerX + 39, playerY + 5, 3, 3);
	context.fillRect(playerX + 40, playerY + 14, 10, 4);

	// Teeth
	context.fillStyle = "#e0f2fe";
	context.fillRect(playerX + 43, playerY + 14, 2, 2);
	context.fillRect(playerX + 47, playerY + 14, 2, 2);

	// Tiny T-Rex arm
	context.fillStyle = "#bae6fd";
	context.fillRect(playerX + 28, playerY + 22, 9, 3);
	context.fillRect(playerX + 35, playerY + 24, 3, 4);

	// Alternating heavy legs
	if (stride === 0) {
		context.fillRect(playerX + 13, playerY + 32, 7, 10);
		context.fillRect(playerX + 10, playerY + 39, 10, 3);
		context.fillRect(playerX + 27, playerY + 32, 7, 6);
		context.fillRect(playerX + 29, playerY + 37, 9, 3);
	} else {
		context.fillRect(playerX + 13, playerY + 32, 7, 6);
		context.fillRect(playerX + 10, playerY + 37, 10, 3);
		context.fillRect(playerX + 27, playerY + 32, 7, 10);
		context.fillRect(playerX + 27, playerY + 39, 10, 3);
	}
};

const drawObstacle = (obstacle: Obstacle) => {
	if (!context) return;

	const y = groundY - obstacle.height;
	if (obstacle.kind === "tree") {
		const trunkWidth = 6;
		const trunkX = obstacle.x + (obstacle.width - trunkWidth) / 2;
		context.fillStyle = "#475569";
		context.fillRect(
			trunkX,
			y + obstacle.height * 0.48,
			trunkWidth,
			obstacle.height * 0.52,
		);

		context.fillStyle = "#4f7773";
		context.fillRect(
			obstacle.x + obstacle.width * 0.28,
			y,
			obstacle.width * 0.44,
			8,
		);
		context.fillRect(
			obstacle.x + obstacle.width * 0.13,
			y + 6,
			obstacle.width * 0.74,
			12,
		);
		context.fillRect(
			obstacle.x,
			y + 14,
			obstacle.width,
			obstacle.height * 0.38,
		);

		context.fillStyle = "#76a39c";
		context.fillRect(obstacle.x + obstacle.width * 0.25, y + 8, 4, 5);
		return;
	}

	context.fillStyle = "#475569";
	context.fillRect(
		obstacle.x + obstacle.width * 0.46,
		y + obstacle.height * 0.42,
		4,
		obstacle.height * 0.58,
	);

	context.fillStyle = "#4f7773";
	context.fillRect(
		obstacle.x + 2,
		y + obstacle.height * 0.35,
		obstacle.width * 0.38,
		obstacle.height * 0.65,
	);
	context.fillRect(
		obstacle.x + obstacle.width * 0.6,
		y + obstacle.height * 0.3,
		obstacle.width * 0.35,
		obstacle.height * 0.7,
	);
	context.fillRect(
		obstacle.x + obstacle.width * 0.28,
		y,
		obstacle.width * 0.42,
		obstacle.height * 0.88,
	);
	context.fillRect(
		obstacle.x,
		y + obstacle.height * 0.68,
		obstacle.width,
		obstacle.height * 0.32,
	);

	context.fillStyle = "#76a39c";
	context.fillRect(obstacle.x + 7, y + obstacle.height * 0.48, 5, 4);
};

const draw = () => {
	if (!context) return;

	context.clearRect(0, 0, width, height);
	context.fillStyle = "rgba(125, 211, 252, 0.05)";
	for (let x = 24; x < width; x += 48) {
		context.fillRect(x, 35, 2, 2);
	}

	context.fillStyle = "rgba(100, 116, 139, 0.7)";
	context.fillRect(0, groundY, width, 2);
	drawRunner();
	for (const obstacle of obstacles) drawObstacle(obstacle);
};

const finishGame = () => {
	running = false;
	statusElement?.replaceChildren(`Game over — score ${score}`);
	restartButton?.classList.remove("hidden");
};

const hasCollision = (obstacle: Obstacle) => {
	const padding = 5;
	return (
		playerX + playerWidth - padding > obstacle.x &&
		playerX + padding < obstacle.x + obstacle.width &&
		playerY + playerHeight - padding > groundY - obstacle.height
	);
};

const update = (delta: number) => {
	const speed = Math.min(440, 285 + score * 2.5);
	distance += speed * delta;
	score = Math.floor(distance / 45);
	scoreElement?.replaceChildren(String(score));

	velocityY += gravity * delta;
	playerY = Math.min(groundY - playerHeight, playerY + velocityY * delta);
	if (playerY === groundY - playerHeight) velocityY = 0;

	spawnTimer += delta;
	if (spawnTimer >= nextSpawn) {
		const kind = Math.random() < 0.58 ? "bush" : "tree";
		const obstacleHeight =
			kind === "tree"
				? 42 + Math.floor(Math.random() * 12)
				: 20 + Math.floor(Math.random() * 9);
		const obstacleWidth =
			kind === "tree"
				? 25 + Math.floor(Math.random() * 7)
				: 31 + Math.floor(Math.random() * 11);
		obstacles.push({
			x: width + 10,
			width: obstacleWidth,
			height: obstacleHeight,
			kind,
		});
		spawnTimer = 0;
		nextSpawn = 0.9 + Math.random() * 0.75;
	}

	obstacles = obstacles
		.map((obstacle) => ({ ...obstacle, x: obstacle.x - speed * delta }))
		.filter((obstacle) => obstacle.x + obstacle.width > 0);

	if (obstacles.some(hasCollision)) finishGame();
};

const frame = (time: number) => {
	if (!running) return;

	const delta = Math.min((time - previousTime) / 1_000, 0.034);
	previousTime = time;
	update(delta);
	draw();

	if (running) animationFrame = requestAnimationFrame(frame);
};

const reset = () => {
	cancelAnimationFrame(animationFrame);
	playerY = groundY - playerHeight;
	velocityY = 0;
	obstacles = [];
	distance = 0;
	score = 0;
	spawnTimer = 0;
	nextSpawn = 1.15;
	previousTime = performance.now();
	running = true;
	scoreElement?.replaceChildren("0");
	statusElement?.replaceChildren("Game started");
	restartButton?.classList.add("hidden");
	draw();
	animationFrame = requestAnimationFrame(frame);
};

const jump = () => {
	if (!running) {
		reset();
		return;
	}

	if (playerY >= groundY - playerHeight - 1) velocityY = jumpVelocity;
};

const handleKeydown = (event: KeyboardEvent) => {
	if (event.code !== "Space" && event.code !== "ArrowUp") return;

	event.preventDefault();
	jump();
};

export const startRunnerGame = () => {
	if (!canvas) return;

	context = canvas.getContext("2d");
	if (!context) return;

	context.imageSmoothingEnabled = false;
	if (!initialized) {
		window.addEventListener("keydown", handleKeydown);
		canvas.addEventListener("pointerdown", jump);
		jumpButton?.addEventListener("click", jump);
		restartButton?.addEventListener("click", reset);
		initialized = true;
	}

	reset();
};
