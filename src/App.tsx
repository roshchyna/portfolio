import { useEffect } from "react";
import AboutSection from "./components/sections/AboutSection";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectSection from "./components/sections/ProjectSection";
import useSectionNavigation from "./hooks/useSectionNavigation";

const navigation = [
	{ href: "#about", label: "About" },
	{ href: "#experience", label: "Experience" },
	{ href: "#project", label: "Project" },
	{ href: "#education", label: "Education" },
];

function GithubIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-5"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
		</svg>
	);
}

function LinkedinIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-5"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M5.4 7.9H1.8V22h3.6V7.9ZM3.6 2A2.1 2.1 0 1 0 3.6 6.2 2.1 2.1 0 0 0 3.6 2ZM22.2 14.3c0-4.3-2.3-6.7-5.4-6.7-2.5 0-3.6 1.4-4.2 2.3v-2H9V22h3.6v-7c0-1.9.4-3.7 2.7-3.7 2.2 0 2.3 2.1 2.3 3.8V22h3.6l1-7.7Z" />
		</svg>
	);
}

function WebsiteIcon() {
	return (
		<svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
			<path
				d="M3 12h18M12 3c2.3 2.46 3.5 5.46 3.5 9s-1.2 6.54-3.5 9c-2.3-2.46-3.5-5.46-3.5-9S9.7 5.46 12 3Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.7"
			/>
		</svg>
	);
}

function MailIcon() {
	return (
		<svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
			<path
				d="m4 6 8 6 8-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.7"
			/>
		</svg>
	);
}

function App() {
	const activeSection = useSectionNavigation(navigation);

	useEffect(() => {
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
		return () => window.removeEventListener("pointermove", updateSpotlight);
	}, []);

	return (
		<>
			<a className="skip-link" href="#content">
				Skip to content
			</a>
			<div aria-hidden="true" className="pointer-glow" />

			<div className="mx-auto min-h-screen max-w-[1280px] px-6 sm:px-10 lg:px-16">
				<div className="lg:flex lg:justify-between lg:gap-16">
					<header className="flex flex-col py-16 lg:sticky lg:top-0 lg:h-screen lg:w-[42%] lg:py-24">
						<div>
							<a className="group inline-block" href="#about">
								<h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-50 sm:text-5xl">
									Mykhailo Roshchyna
								</h1>
							</a>
							<h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-100">
								Frontend Software Engineer
							</h2>
							<p className="mt-4 max-w-sm text-base leading-7 text-slate-400">
								I build accessible, data-intensive product experiences with
								React and TypeScript.
							</p>
							<p className="mt-3 text-sm font-medium text-sky-300/90">
								Clemmons, North Carolina
							</p>
						</div>

						<nav
							aria-label="Section navigation"
							className="mt-16 hidden lg:block"
						>
							<ul className="space-y-1">
								{navigation.map(({ href, label }) => {
									const isActive = activeSection === href.slice(1);
									return (
										<li key={href}>
											<a
												aria-current={isActive ? "location" : undefined}
												className={`group flex w-fit items-center gap-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
													isActive
														? "text-slate-100"
														: "text-slate-500 hover:text-slate-200"
												}`}
												href={href}
											>
												<span
													className={`h-px transition-all duration-300 ${
														isActive
															? "w-16 bg-sky-300"
															: "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-300"
													}`}
												/>
												{label}
											</a>
										</li>
									);
								})}
							</ul>
						</nav>

						<div className="mt-10 flex items-center gap-5 lg:mt-auto">
							<a
								aria-label="Mykhailo Roshchyna on GitHub"
								className="social-link"
								data-tooltip="GitHub"
								href="https://github.com/roshchyna/"
								rel="noreferrer"
								target="_blank"
							>
								<GithubIcon />
							</a>
							<a
								aria-label="Mykhailo Roshchyna on LinkedIn"
								className="social-link"
								data-tooltip="LinkedIn"
								href="https://www.linkedin.com/in/mykhailo-roshchyna/"
								rel="noreferrer"
								target="_blank"
							>
								<LinkedinIcon />
							</a>
							<a
								aria-label="Visit MySofinka"
								className="social-link"
								data-tooltip="MySofinka"
								href="https://mysofinka.com"
								rel="noreferrer"
								target="_blank"
							>
								<WebsiteIcon />
							</a>
							<a
								aria-label="Email Mykhailo Roshchyna"
								className="social-link"
								data-tooltip="Email"
								href="mailto:mykhailo.roshchyna@gmail.com"
							>
								<MailIcon />
							</a>
						</div>
					</header>

					<main className="pb-24 lg:w-[54%] lg:py-24" id="content">
						<AboutSection />
						<ExperienceSection />
						<ProjectSection />
						<EducationSection />

						<section
							aria-labelledby="contact-heading"
							className="section-block pb-8"
							id="contact"
						>
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
								What’s next?
							</p>
							<h2
								className="mt-4 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
								id="contact-heading"
							>
								Let’s build something useful.
							</h2>
							<p className="mt-5 max-w-xl leading-7 text-slate-400">
								I’m interested in frontend and software engineering roles where
								product thinking, accessibility, and robust React architecture
								matter.
							</p>
							<a
								className="contact-button"
								href="mailto:mykhailo.roshchyna@gmail.com"
							>
								Say hello
							</a>
						</section>

						<footer className="border-t border-slate-800/70 pt-7 text-sm leading-6 text-slate-500">
							<p>Built with React, TypeScript, Vite, and Tailwind CSS.</p>
						</footer>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
