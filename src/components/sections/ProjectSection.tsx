import ArrowUpRightIcon from "../icons/ArrowUpRightIcon";

const projectTechnologies = [
	"React",
	"TypeScript",
	"TanStack",
	"Tailwind CSS",
	"i18next",
	"Vitest",
	"OpenRouter",
];

const ProjectSection = () => {
	return (
		<section
			aria-labelledby="project-heading"
			className="section-block"
			id="project"
		>
			<h2 className="mobile-section-title" id="project-heading">
				Featured project
			</h2>
			<article className="project-card group">
				<a
					aria-label="Open MySofinka live demo"
					className="project-preview block"
					href="https://mysofinka.com"
					rel="noreferrer"
					target="_blank"
				>
					<img
						alt="MySofinka quiz interface with multiple-choice questions, food sorting, and the Muza assistant."
						className="block h-auto w-full"
						decoding="async"
						height={988}
						loading="lazy"
						src="/images/mysofinka-preview.jpg"
						width={1713}
					/>
				</a>

				<div className="p-6 sm:p-8">
					<p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
						Personal project
					</p>
					<h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-50">
						MySofinka
					</h3>
					<p className="mt-4 leading-7 text-slate-400">
						A multilingual quiz application for children with play mode, nine
						typed question formats, a full question constructor, per-language
						browser persistence, and optional AI-assisted question generation.
					</p>
					<p className="mt-4 leading-7 text-slate-400">
						The architecture keeps question rendering, editing, storage,
						localization, and AI normalization separate so each workflow remains
						predictable and testable.
					</p>
					<ul
						aria-label="MySofinka technologies"
						className="mt-5 flex flex-wrap gap-2"
					>
						{projectTechnologies.map((tag) => (
							<li className="skill-pill" key={tag}>
								{tag}
							</li>
						))}
					</ul>
					<div className="mt-7 flex flex-wrap gap-5">
						<a
							className="project-link group"
							href="https://mysofinka.com"
							rel="noreferrer"
							target="_blank"
						>
							Open live demo <ArrowUpRightIcon />
						</a>
						<a
							className="project-link group"
							href="https://github.com/roshchyna/sofinka"
							rel="noreferrer"
							target="_blank"
						>
							View source <ArrowUpRightIcon />
						</a>
					</div>
				</div>
			</article>
		</section>
	);
};

export default ProjectSection;
