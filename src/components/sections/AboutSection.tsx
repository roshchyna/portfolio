import { primarySkills } from "../../data/portfolio";

const AboutSection = () => {
	return (
		<section
			aria-labelledby="about-heading"
			className="section-block pt-4 lg:pt-0"
			id="about"
		>
			<h2 className="mobile-section-title" id="about-heading">
				About
			</h2>
			<div className="space-y-5 text-[0.97rem] leading-7 text-slate-400">
				<p>
					I’m a frontend engineer with six years of experience turning complex
					product requirements into clear, dependable interfaces. My work spans
					cybersecurity dashboards, insurance platforms, content-driven
					websites, and mobile products.
				</p>
				<p>
					I’m most at home where thoughtful interaction design meets frontend
					architecture: reusable component systems, accessible workflows, data
					visualization, API integration, performance, and automated testing.
				</p>
				<p>
					Alongside product work, I’m pursuing an M.S. in Software Engineering
					with an AI Engineering specialization at WGU, expected in 2027.
				</p>
			</div>
			<ul
				aria-label="Primary technologies"
				className="mt-8 flex flex-wrap gap-2"
			>
				{primarySkills.map((skill) => (
					<li className="skill-pill" key={skill}>
						{skill}
					</li>
				))}
			</ul>
		</section>
	);
};

export default AboutSection;
