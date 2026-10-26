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
				<div
					aria-label="Stylized MySofinka interface preview"
					className="project-preview"
					role="img"
				>
					<div className="flex items-center justify-between border-b border-slate-700/80 px-4 py-3">
						<div aria-hidden="true" className="flex gap-1.5">
							<span className="size-2 rounded-full bg-rose-300/70" />
							<span className="size-2 rounded-full bg-amber-300/70" />
							<span className="size-2 rounded-full bg-emerald-300/70" />
						</div>
						<span className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-slate-500">
							Interface concept
						</span>
					</div>
					<div className="grid min-h-64 place-items-center p-5 sm:p-8">
						<div className="w-full max-w-sm rounded-2xl border border-sky-300/15 bg-slate-950/75 p-5 shadow-2xl shadow-sky-950/40">
							<div className="flex items-center justify-between">
								<p className="text-sm font-bold text-slate-100">MySofinka</p>
								<span className="rounded-full bg-violet-300/10 px-2.5 py-1 text-[0.64rem] font-semibold text-violet-200">
									EN · UK · RU
								</span>
							</div>
							<p className="mt-6 text-xs font-semibold uppercase tracking-widest text-sky-300">
								Question constructor
							</p>
							<p className="mt-2 text-lg font-semibold text-slate-100">
								Build a better learning moment.
							</p>
							<div className="mt-5 grid grid-cols-2 gap-2 text-xs text-slate-300">
								<span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5">
									Multiple choice
								</span>
								<span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5">
									Matching
								</span>
								<span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5">
									Ordering
								</span>
								<span className="rounded-lg border border-sky-300/30 bg-sky-300/10 px-3 py-2.5 text-sky-200">
									Generate with AI
								</span>
							</div>
						</div>
					</div>
				</div>

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
