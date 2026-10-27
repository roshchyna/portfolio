const EducationSection = () => {
	return (
		<section
			aria-labelledby="education-heading"
			className="section-block"
			id="education"
		>
			<h2 className="mobile-section-title" id="education-heading">
				Education
			</h2>
			<div className="space-y-8">
				<div>
					<p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
						Expected 2027
					</p>
					<h3 className="mt-2 font-semibold text-slate-100">
						M.S. Software Engineering - AI Engineering
					</h3>
					<p className="mt-1 text-sm text-slate-400">
						Western Governors University
					</p>
				</div>
				<div>
					<p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
						WES evaluated
					</p>
					<h3 className="mt-2 font-semibold text-slate-100">
						Master’s degrees in Law and Public Administration
					</h3>
					<p className="mt-1 text-sm text-slate-400">Ukraine</p>
				</div>
				<div className="rounded-2xl border border-slate-800 bg-slate-900/35 p-5">
					<p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
						Continued learning
					</p>
					<ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
						<li>Meta Front-End Developer Professional Certificate</li>
						<li>Building with the Claude API - Anthropic Education</li>
						<li>CSS for JavaScript Developers - Josh W. Comeau</li>
						<li>Introduction to Python Programming - WGU Academy</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default EducationSection;
