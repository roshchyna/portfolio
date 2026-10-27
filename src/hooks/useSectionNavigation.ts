import { useEffect, useState } from "react";

type SectionLink = { href: string };

const useSectionNavigation = (navigation: readonly SectionLink[]) => {
	const [activeSection, setActiveSection] = useState(() => {
		const hash = window.location.hash;
		return (
			(
				navigation.find((item) => item.href === hash) ?? navigation[0]
			)?.href.slice(1) ?? ""
		);
	});

	useEffect(() => {
		const sections = navigation
			.map(({ href }) => document.getElementById(href.slice(1)))
			.filter((section): section is HTMLElement => section !== null);
		let pending: string | null = null;
		let frame = 0;
		let navigationFrame = 0;
		let settleTimer = 0;

		// Choose from all sections, independently of their heights or event order.
		const update = () => {
			frame = 0;
			if (pending || !sections.length) return;
			const first = sections[0];
			const offset =
				Number.parseFloat(getComputedStyle(first).scrollMarginTop) || 0;
			const line = Math.max(offset + 1, window.innerHeight * 0.2);
			let current = first.id;
			for (const section of sections) {
				if (section.getBoundingClientRect().top <= line) current = section.id;
			}
			setActiveSection(current);
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		const finish = () => {
			window.clearTimeout(settleTimer);
			pending = null;
			schedule();
		};
		const begin = (id: string) => {
			pending = id;
			setActiveSection(id);
			window.clearTimeout(settleTimer);
			// A repeated anchor click may cause no scroll and no scrollend event.
			settleTimer = window.setTimeout(finish, 500);
		};
		const onScroll = () => {
			if (pending) {
				const target = sections.find(({ id }) => id === pending);
				if (target) {
					const offset =
						Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
					const destination = Math.max(
						0,
						Math.min(
							window.scrollY + target.getBoundingClientRect().top - offset,
							document.documentElement.scrollHeight - window.innerHeight,
						),
					);
					if (Math.abs(window.scrollY - destination) <= 2) {
						finish();
						return;
					}
				}
				window.clearTimeout(settleTimer);
				// Also supports browsers without scrollend.
				settleTimer = window.setTimeout(finish, 180);
			} else schedule();
		};
		const onClick = (event: MouseEvent) => {
			if (
				event.defaultPrevented ||
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			)
				return;
			const link =
				event.target instanceof Element
					? event.target.closest<HTMLAnchorElement>("a[href]")
					: null;
			if (
				!link ||
				link.hasAttribute("download") ||
				(link.target && link.target !== "_self")
			)
				return;
			const url = new URL(link.href);
			if (
				url.origin !== location.origin ||
				url.pathname !== location.pathname ||
				url.search !== location.search
			)
				return;
			const section = sections.find(({ id }) => `#${id}` === url.hash);
			if (section) begin(section.id);
			// Keep native anchor navigation, history and keyboard behavior.
		};
		const onHashChange = () => {
			const section = sections.find(({ id }) => `#${id}` === location.hash);
			cancelAnimationFrame(navigationFrame);
			if (section) {
				begin(section.id);
				// History may restore a position captured halfway through a transition.
				navigationFrame = requestAnimationFrame(() => {
					section.scrollIntoView({ block: "start", behavior: "auto" });
				});
			} else finish();
		};
		const interrupt = () => {
			if (!pending) return;
			cancelAnimationFrame(navigationFrame);
			window.scrollTo({
				top: window.scrollY,
				left: window.scrollX,
				behavior: "instant",
			});
			finish();
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (
				event.target instanceof Element &&
				event.target.closest("input, textarea, select, [contenteditable=true]")
			)
				return;
			if (
				[
					"ArrowUp",
					"ArrowDown",
					"PageUp",
					"PageDown",
					"Home",
					"End",
					" ",
				].includes(event.key)
			)
				interrupt();
		};
		const resizeObserver = new ResizeObserver(schedule);
		for (const section of sections) resizeObserver.observe(section);
		document.addEventListener("click", onClick);
		document.addEventListener("scroll", onScroll, { passive: true });
		document.addEventListener("scrollend", finish);
		window.addEventListener("hashchange", onHashChange);
		window.addEventListener("popstate", onHashChange);
		window.addEventListener("resize", schedule);
		window.addEventListener("pageshow", schedule);
		window.addEventListener("wheel", interrupt, { passive: true });
		window.addEventListener("pointerdown", interrupt, { passive: true });
		window.addEventListener("touchstart", interrupt, { passive: true });
		window.addEventListener("keydown", onKeyDown);
		onHashChange();

		return () => {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(navigationFrame);
			window.clearTimeout(settleTimer);
			resizeObserver.disconnect();
			document.removeEventListener("click", onClick);
			document.removeEventListener("scroll", onScroll);
			document.removeEventListener("scrollend", finish);
			window.removeEventListener("hashchange", onHashChange);
			window.removeEventListener("popstate", onHashChange);
			window.removeEventListener("resize", schedule);
			window.removeEventListener("pageshow", schedule);
			window.removeEventListener("wheel", interrupt);
			window.removeEventListener("pointerdown", interrupt);
			window.removeEventListener("touchstart", interrupt);
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [navigation]);

	return activeSection;
};

export default useSectionNavigation;
