const publicationSearch = document.querySelector("#publication-search-input");

if (publicationSearch) {
	const publicationStatus = document.querySelector("#publication-search-status");
	const publicationNoResults = document.querySelector("#publication-no-results");
	const publicationYears = [...document.querySelectorAll(".publication-year")];
	const publicationItems = publicationYears.flatMap((year) => [...year.querySelectorAll("li")]);
	const workingPaperTitles = new Set([
		"Inference on the Value of Policy Improvement in Adaptive Experiments",
		"Measuring Gift Card Program Incrementality via Causal Data Fusion",
		"Simultaneous Inference for Local Structural Parameters with Random Forests",
		"Taking a Moment for Distributional Robustness",
		"Dynamic Local Average Treatment Effects",
		"Structure-agnostic Optimality of Doubly Robust Learning for Treatment Effect Estimation",
		"Regularized DeepIV with Model Selection",
		"Incentive-Aware Synthetic Control: Accurate Counterfactual Estimation via Incentivized Exploration",
		"Source Condition Double Robust Inference on Functionals of Inverse Problems",
		"Post Reinforcement Learning Inference",
		"Synthetic Blips: Generalizing Synthetic Controls for Dynamic Treatment Effects",
		"Long Story Short: Omitted Variable Bias in Causal Machine Learning",
		"Automatic Debiased Machine Learning for Dynamic Treatment Effects",
		"Automatic Debiased Machine Learning via Riesz Regression",
		"Finding Subgroups with Significant Treatment Effects",
		"Adversarial Estimation of Riesz Representers",
		"Inference on Auctions with Weak Assumptions on Information"
	]);
	const surveyTitles = new Set([
		"Price of Anarchy in Auctions",
		"Algorithmic Game Theory and Econometrics",
		"The Dining Bidder Problem: a la russe et a la francaise"
	]);
	const thesisTitles = new Set([
		"Efficiency of Mechanisms in Complex Markets",
		"Equilibria in Congestion Game Models: Existence, Complexity and Efficiency"
	]);
	const miscellaneousTitles = new Set([
		"A Proof of Orthogonal Double Machine Learning with Z-Estimators",
		"Pricing Queries Approximately Optimally",
		"Price of Stability in Games of Incomplete Information"
	]);
	const archivalLinks = [
		["Regularized Orthogonal Machine Learning for Nonlinear Semiparametric Models", [["GitHub code", "https://github.com/vsyrgkanis/plugin_regularized_estimation"]]],
		["Minimax Estimation of Conditional Moment Models", [
			["GitHub code", "https://github.com/microsoft/AdversarialGMM"],
			["Microsoft Research blog post", "https://www.microsoft.com/en-us/research/blog/adversarial-machine-learning-and-instrumental-variables-for-flexible-causal-modeling/"],
			["Adversarial Generalized Method of Moments", "https://arxiv.org/abs/1803.07164"]
		]],
		["Machine Learning Estimation of Heterogeneous Treatment Effects with Instruments", [["GitHub code", "https://github.com/microsoft/EconML/tree/master/prototypes/dml_iv"]]],
		["Orthogonal Random Forest for Causal Inference", [["GitHub code", "https://github.com/Microsoft/EconML/tree/master/prototypes/orthogonal_forests"]]],
		["Learning to Bid Without Knowing your Value", [["GitHub code", "https://github.com/charapod/bandit-sponsored-search"]]],
		["Training GANs with Optimism", [["GitHub code", "https://github.com/vsyrgkanis/optimistic_GAN_training"]]],
		["Robust Optimization for Non-Convex Objectives", [["GitHub code", "https://github.com/robertsychen/RobustOptimization"]]],
		["Bayesian Incentive-Compatible Bandit Exploration", [
			["Operations Research, 2020", "https://pubsonline.informs.org/doi/10.1287/opre.2019.1949"]
		]],
		["Information Asymmetries in Common-Value Auctions with Discrete Signals", [
			["Mathematics of Operations Research, 2019", "https://pubsonline.informs.org/doi/10.1287/moor.2018.0979"],
			["MATLAB code", "Matlab-code-assymetric-fpa-equilibrium.zip"],
			["Mathematica notebook", "binary_signal_value_public_version.zip"]
		]],
		["Social Status and Badge Design", [
			["2013 NBER Market Design Working Group Meeting", "http://conference.nber.org/confer/2013/MDf13/program.html"]
		]],
		["The Complexity of Equilibria in Cost Sharing Games", [["Slides", "Final_Syrgkanis_WINE2010.pptx"]]],
		["Inference on Auctions with Weak Assumptions on Information", [["GitHub code", "https://github.com/vsyrgkanis/information_robust_econometrics_auctions"]]]
	];
	const journalLinks = [
		["Incentive-Aware Synthetic Control: Accurate Counterfactual Estimation via Incentivized Exploration", [["TMLR journal version", "https://openreview.net/forum?id=koln3ufP5c"]]],
		["Automatic Debiased Machine Learning for Covariate Shifts", [["Biometrika journal version", "https://doi.org/10.1093/biomet/asag033"]]],
		["Post Reinforcement Learning Inference", [["Operations Research journal version", "https://doi.org/10.1287/opre.2024.1019"]]],
		["Inference on Strongly Identified Functionals of Weakly Identified Functions", [["JRSS-B journal version", "https://doi.org/10.1093/jrsssb/qkaf075"]]],
		["Regularized Orthogonal Machine Learning for Nonlinear Semiparametric Models", [["Econometrics Journal version", "https://doi.org/10.1093/ectj/utab022"]]],
		["Long Story Short: Omitted Variable Bias in Causal Machine Learning", [["Review of Economics and Statistics journal version", "https://doi.org/10.1162/rest.a.1705"]]],
		["Adversarial Estimation of Riesz Representers", [["JASA journal version", "https://doi.org/10.1080/01621459.2025.2588833"]]],
		["Dynamically Aggregating Diverse Information", [["Econometrica journal version", "https://doi.org/10.3982/ecta18324"]]],
		["Orthogonal Statistical Learning", [["Annals of Statistics journal version", "https://doi.org/10.1214/23-AOS2258"]]],
		["Bayesian Exploration: Incentivizing Exploration in Bayesian Games", [["Operations Research journal version", "https://doi.org/10.1287/opre.2021.2205"]]],
		["Price of Anarchy in Auctions", [["JAIR journal version", "https://jair.org/index.php/jair/article/view/11062"]]]
	];

	for (const [title, links] of [...archivalLinks, ...journalLinks]) {
		const item = publicationItems.find((publication) => publication.querySelector(":scope > a")?.textContent.trim() === title);

		if (!item) {
			throw new Error(`Could not find publication entry for archival links: ${title}`);
		}

		const existingLinks = new Set([...item.querySelectorAll("a")].map((link) => link.href));
		const missingLinks = links.filter(([, href]) => !existingLinks.has(new URL(href, document.baseURI).href));

		if (missingLinks.length === 0) {
			continue;
		}

		const relatedLinks = document.createElement("p");
		relatedLinks.className = "publication-related-links";
		relatedLinks.append("Also: ");

		missingLinks.forEach(([label, href], index) => {
			if (index > 0) {
				relatedLinks.append(" · ");
			}

			const link = document.createElement("a");
			link.href = href;
			link.textContent = label;
			relatedLinks.append(link);
		});

		item.append(relatedLinks);
	}

	const conferencePattern = /\b(AAAI|AISTATS|COLM|COLT|FOCS|ICML|ICLR|ITCS|NeurIPS|SAGT|SODA|STOC|UAI|WINE|WWW|CTW|CLEaR|PSB)(?:\s?['’]?\d{2,4})?\b|\bEC\s?['’]?\d{2,4}\b|Pacific Symposium on Biocomputing/i;
	const journalPattern = /\b(Annals of Statistics|Biometrika|Econometrica|Econometrics Journal|Journal of Artificial Intelligence Research|JAIR|Journal of the American Statistical Association|JASA|Journal of the Royal Statistical Society|JRSS|Mathematics of Operations Research|Nature Genetics|Operations Research|PLOS ONE|Quantitative Economics|Review of Economic Studies|Review of Economics and Statistics|ReSTAT|TMLR)\b/i;
	const venuePattern = /\b(?:Pacific Symposium on Biocomputing(?:\s+\d{4})?|Journal of the American Statistical Association|Journal of Artificial Intelligence Research|Journal of the Royal Statistical Society(?:[- ]B)?|Mathematics of Operations Research|Review of Economics and Statistics|Review of Economic Studies|Annals of Statistics|Econometrics Journal|Nature Genetics|Quantitative Economics|SIGecom Exchanges|Biometrika|Econometrica|Operations Research|PLOS ONE|AAAI|AISTATS|COLM|CLEaR|COLT|CTW|EC|FOCS|ICLR|ICML|ITCS|JAIR|JASA|JRSS(?:-B)?|NeurIPS|PSB|ReSTAT|SAGT|SODA|STOC|TMLR|UAI|WINE|WWW)(?:\s?['’]?\s?\d{2,4})?\b/gi;
	const publishedYearOverrides = new Map([
		["Automatic Debiased Machine Learning for Covariate Shifts", 2026],
		["Incentive-Aware Synthetic Control: Accurate Counterfactual Estimation via Incentivized Exploration", 2026],
		["Long Story Short: Omitted Variable Bias in Causal Machine Learning", 2026],
		["Post Reinforcement Learning Inference", 2025]
	]);

	for (const item of publicationItems) {
		const title = item.querySelector(":scope > a")?.textContent.trim() ?? "";
		const metadataParagraph = item.querySelector(":scope > p");
		let metadata = metadataParagraph?.textContent ?? "";
		const categories = new Set();

		if (conferencePattern.test(metadata)) {
			categories.add("conference");
		}
		if (journalPattern.test(metadata) || journalLinks.some(([journalTitle]) => journalTitle === title)) {
			categories.add("journal");
		}
		if (surveyTitles.has(title)) {
			categories.add("survey");
		}
		if (thesisTitles.has(title)) {
			categories.add("thesis");
		}
		if (miscellaneousTitles.has(title)) {
			categories.add("misc");
		}
		if ((workingPaperTitles.has(title) || /arxiv/i.test(metadata)) && !categories.has("conference") && !categories.has("journal")) {
			categories.add("working");
		}

		if (categories.size === 0) {
			categories.add("working");
		}

		if (metadataParagraph && (categories.has("conference") || categories.has("journal"))) {
			metadata = metadata
				.replace(/\bArxiv\s?\d{2,4}\s*,?\s*/gi, "")
				.replace(/,\s*\+/g, ",")
				.replace(/\s{2,}/g, " ")
				.replace(/,\s*,/g, ",")
				.replace(/,\s*$/, "");
			metadataParagraph.textContent = metadata;

			const currentYear = Number(item.closest(".publication-year")?.querySelector("h3")?.textContent);
			const venueMatches = [...metadata.matchAll(venuePattern)];
			const conferenceYear = venueMatches
				.filter(({ 0: venue }) => conferencePattern.test(venue))
				.map(({ 0: venue }) => venue.match(/((?:19|20)\d{2}|\d{2})\b/)?.[1])
				.filter(Boolean)
				.map((year) => Number(year.length === 2 ? `20${year}` : year))
				.at(-1);
			const journalYear = venueMatches
				.map(({ 0: venue }) => venue.match(/((?:19|20)\d{2}|\d{2})\b/)?.[1])
				.filter(Boolean)
				.map((year) => Number(year.length === 2 ? `20${year}` : year))
				.at(-1);
			const publicationYear = publishedYearOverrides.get(title)
				?? conferenceYear
				?? journalYear
				?? currentYear;

			if (publicationYear !== currentYear) {
				const targetYear = publicationYears.find((year) => Number(year.querySelector("h3")?.textContent) === publicationYear);
				if (!targetYear) {
					throw new Error(`Could not find publication year section ${publicationYear} for "${title}".`);
				}
				targetYear.querySelector("ol").append(item);
			}
		}

		if (metadataParagraph && (categories.has("conference") || categories.has("journal"))) {
			const matches = [...metadata.matchAll(venuePattern)];
			if (matches.length > 0) {
				const formattedMetadata = document.createDocumentFragment();
				let previousIndex = 0;

				for (const match of matches) {
					const start = match.index;
					const end = start + match[0].length;
					formattedMetadata.append(metadata.slice(previousIndex, start));
					const venue = document.createElement("strong");
					venue.textContent = match[0];
					formattedMetadata.append(venue);
					previousIndex = end;
				}

				formattedMetadata.append(metadata.slice(previousIndex));
				metadataParagraph.replaceChildren(formattedMetadata);
			}
		}

		const tags = document.createElement("span");
		tags.className = "publication-tags";
		tags.setAttribute("aria-label", "Publication categories");
		for (const category of categories) {
			const tag = document.createElement("span");
			tag.dataset.category = category;
			tag.textContent = `#${category}`;
			tags.append(tag);
		}
		if (metadataParagraph) {
			metadataParagraph.append(" ", tags);
		} else {
			const tagParagraph = document.createElement("p");
			tagParagraph.append(tags);
			item.append(tagParagraph);
		}
	}

	publicationStatus.textContent = `Showing all ${publicationItems.length} publications and archival works. Search titles, authors, or venues.`;

	publicationSearch.addEventListener("input", () => {
		const query = publicationSearch.value.trim().toLocaleLowerCase();
		let visibleCount = 0;

		for (const item of publicationItems) {
			const matches = item.textContent.toLocaleLowerCase().includes(query);
			item.hidden = !matches;
			visibleCount += Number(matches);
		}

		for (const year of publicationYears) {
			year.hidden = ![...year.querySelectorAll("li")].some((item) => !item.hidden);
		}

		publicationStatus.textContent = query
			? `Showing ${visibleCount} of ${publicationItems.length} entries.`
			: `Showing all ${publicationItems.length} publications and archival works. Search titles, authors, or venues.`;
		publicationNoResults.hidden = visibleCount > 0;
	});
}
