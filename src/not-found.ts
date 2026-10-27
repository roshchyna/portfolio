const updateSpotlight = (event: PointerEvent) => {
	document.documentElement.style.setProperty(
		"--pointer-x",
		`${event.clientX}px`,
	);
	document.documentElement.style.setProperty(
		"--pointer-y",
		`${event.clientY}px`,
	);
};

window.addEventListener("pointermove", updateSpotlight, { passive: true });

const gameToggle = document.querySelector<HTMLButtonElement>("#game-toggle");
const game = document.querySelector<HTMLElement>("#runner-game");

gameToggle?.addEventListener("click", async () => {
	if (!game) return;

	game.classList.remove("hidden");
	gameToggle.classList.add("hidden");
	gameToggle.setAttribute("aria-expanded", "true");

	const { startRunnerGame } = await import("./runner-game");
	startRunnerGame();
	game.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
