export type Experience = {
	company: string;
	dates: string;
	description: string;
	role: string;
	tags: string[];
};

export const experiences: Experience[] = [
	{
		company: "Booli.ai by Fulcrum Technology Solutions",
		dates: "2023 - 2026",
		role: "Frontend Developer",
		description:
			"Built data-intensive product experiences for an identity-centric SIEM and MDR platform: 15+ production screens, reusable grids and filters, 12+ executive security widgets, and the conversation interface for Leon, an AI security assistant. Delivered a React 19 migration across 70+ files and expanded component and end-to-end coverage in GitLab CI.",
		tags: [
			"React",
			"TypeScript",
			"TanStack Query",
			"Highcharts",
			"Playwright",
			"GitLab CI",
		],
	},
	{
		company: "iptiQ by Swiss Re",
		dates: "2022 - 2023",
		role: "Associate Software Engineer",
		description:
			"Worked across React interfaces and a Node.js/TypeScript BFF for a digital insurance platform. Unified quote flows behind a public GraphQL contract, connected downstream REST services, and extended pricing and underwriting workflows for multi-tenant insurance products.",
		tags: [
			"TypeScript",
			"React",
			"Node.js",
			"GraphQL",
			"Apollo",
			"REST APIs",
			"Jest",
		],
	},
	{
		company: "VP Software",
		dates: "2019 - 2022",
		role: "Frontend Developer",
		description:
			"Progressed from internship to frontend development across European client products. Built CMS-driven catalogs, a Google Maps dealer locator, localized Next.js experiences for nine countries with Arabic RTL support, and schema-driven workflows spanning React web and React Native applications.",
		tags: [
			"React",
			"Next.js",
			"React Native",
			"TypeScript",
			"GraphQL",
			"Directus",
			"AWS Lambda",
		],
	},
];

export const primarySkills = [
	"React",
	"TypeScript",
	"JavaScript",
	"Next.js",
	"React Native",
	"GraphQL",
	"Node.js",
	"Accessibility",
	"Automated testing",
];
