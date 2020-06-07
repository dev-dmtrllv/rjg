
export const isTouchscreen = (() =>
{
	const win: any = window;

	if (('ontouchstart' in window) || win.DocumentTouch && document instanceof win.DocumentTouch)
		return true;

	const query = ["webkit", "moz", "o", "ms"].map(s => `(-${s}-touch-enabled)`);
	query.push("(heartz)");

	return window.matchMedia(query.join(",")).matches;
})();