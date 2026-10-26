import { experiences } from "../../data/portfolio";
import ArrowUpRightIcon from "../icons/ArrowUpRightIcon";

const ExperienceSection = () => {
	return (
		<section
			aria-labelledby="experience-heading"
			className="section-block"
			id="experience"
		>
			<h2 className="mobile-section-title" id="experience-heading">
				Experience
			</h2>
			<ol className="space-y-5">
				{experiences.map((experience) => (
					<li
						className="group relative rounded-2xl transition-colors lg:hover:bg-white/[0.035]"
						key={experience.company}
					>
						<div className="grid gap-2 p-1 py-5 sm:grid-cols-[8.5rem_1fr] lg:p-5">
							<p className="pt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
								{experience.dates}
							</p>
							<div>
								<h3 className="font-semibold leading-snug text-slate-100 transition-colors group-hover:text-sky-300">
									{experience.role} · {experience.company}
								</h3>
								<p className="mt-3 text-sm leading-6 text-slate-400">
									{experience.description}
								</p>
								<ul
									aria-label={`Technologies used at ${experience.company}`}
									className="mt-4 flex flex-wrap gap-2"
								>
									{experience.tags.map((tag) => (
										<li className="skill-pill" key={tag}>
											{tag}
										</li>
									))}
								</ul>
							</div>
						</div>
					</li>
				))}
			</ol>
			<a
				className="group mt-8 inline-flex items-center gap-1.5 border-b border-sky-300/40 pb-1 text-sm font-semibold text-slate-100 transition-colors hover:border-sky-300 hover:text-sky-300"
				href="/Mykhailo_Roshchyna_Resume.pdf"
				rel="noreferrer"
				target="_blank"
			>
				View full résumé <ArrowUpRightIcon />
			</a>
		</section>
	);
};

export default ExperienceSection;
