// Site content for Jack Sloan's portfolio, sourced from the Firecrawl scrape of
// jacksloan.dev (see designs/source/). Edit here to update the site.

export const profile = {
	name: 'Jack Sloan',
	role: 'Software Consultant',
	tagline: 'A Minnesota-based software consultant living on the north shore of Lake Superior.',
	bio: "I build pragmatic, type-safe web software with clean abstractions and good developer experience — across SvelteKit, Angular, Go, and TypeScript tooling. I care about reliability, maintainability, and shipping things that hold up.",
	email: 'hi@jacksloan.dev',
	photo: 'https://jacksloan.dev/onion-river-ski.jpg',
	photoAlt: 'Jack skiing at Onion River Road, Lutsen MN'
};

export interface SocialLink {
	label: string;
	href: string;
}

export const socials: SocialLink[] = [
	{ label: 'GitHub', href: 'https://github.com/jacksloan' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/jack-sloan/' },
	{ label: 'YouTube', href: 'https://www.youtube.com/user/jbsloan1/featured' },
	{ label: 'Instagram', href: 'https://www.instagram.com/jaack.sloan/' }
];

export const resumeUrl =
	'https://docs.google.com/document/d/1ukmcXTZxT4qIZSJprqPtwnEbyp5a5XD146htVwJ9W6U/edit?usp=sharing';

export interface Project {
	name: string;
	description: string;
	url: string;
	tech: string[];
}

// A selection of open-source work (github.com/jacksloan), chosen to show range.
export const projects: Project[] = [
	{
		name: 'rx-query-store',
		description: 'Simple, framework-agnostic state management for the web.',
		url: 'https://github.com/jacksloan/rx-query-store',
		tech: ['RxJS', 'Redux pattern', 'Angular']
	},
	{
		name: 'prisma-proxy',
		description: 'Type-safe proxy servers and clients for Prisma.',
		url: 'https://github.com/jacksloan/prisma-proxy',
		tech: ['Prisma', 'Express', 'TypeScript']
	},
	{
		name: 'airtable-extensions',
		description: 'Type-safe Airtable clients with automatic rate-limiting and request queueing.',
		url: 'https://github.com/jacksloan/airtable-extensions',
		tech: ['Airtable', 'Codegen', 'TypeScript']
	},
	{
		name: 'ng-dnd-form-builder',
		description: 'An Angular drag-and-drop form builder.',
		url: 'https://github.com/jacksloan/ng-dnd-form-builder',
		tech: ['Angular', 'Forms']
	},
	{
		name: 'qlab-rest',
		description: 'Send OSC messages to QLab over HTTP — Swagger UI, speech-to-text cues, HTTP proxy.',
		url: 'https://github.com/jacksloan/qlab-rest',
		tech: ['Go', 'Svelte', 'TypeScript']
	},
	{
		name: 'nx-strapi-sveltekit-blog',
		description: 'An example Strapi blog inside an Nx monorepo.',
		url: 'https://github.com/jacksloan/nx-strapi-sveltekit-blog',
		tech: ['Nx', 'Strapi', 'SvelteKit']
	}
];
