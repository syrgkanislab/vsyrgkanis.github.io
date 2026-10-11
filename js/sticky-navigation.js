const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
	const updateHeaderOffset = () => {
		document.documentElement.style.setProperty("--site-header-height", `${siteHeader.getBoundingClientRect().height}px`);
	};

	updateHeaderOffset();
	new ResizeObserver(updateHeaderOffset).observe(siteHeader);

	const toggle = siteHeader.querySelector(".nav-toggle");
	const nav = siteHeader.querySelector("nav");
	if (toggle && nav) {
		const setOpen = (open) => {
			nav.classList.toggle("open", open);
			toggle.setAttribute("aria-expanded", String(open));
		};
		toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
		nav.addEventListener("click", (event) => {
			if (event.target.closest("a")) setOpen(false);
		});

		const inner = siteHeader.querySelector(".header-inner");
		const updateCollapsed = () => {
			siteHeader.classList.remove("nav-collapsed");
			nav.style.flexWrap = "nowrap";
			const overflows = inner.scrollWidth > inner.clientWidth;
			nav.style.flexWrap = "";
			siteHeader.classList.toggle("nav-collapsed", overflows);
			if (!overflows) setOpen(false);
		};

		updateCollapsed();
		new ResizeObserver(updateCollapsed).observe(inner);
		document.fonts?.ready.then(updateCollapsed);
	}
}
