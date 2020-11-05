export const scrollTo = (offset: number) =>
{
	document.scrollingElement?.scrollTo({
		left: 0,
		top: offset,
		behavior: "smooth"
	});
};

export const scrollToTop = () => scrollTo(0);