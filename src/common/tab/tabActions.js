export const TAB_SELECTED = '[TAB] SELECTED';
export const TAB_SHOWED = '[TAB] TABS TO SHOW';

export function selectTab(tabId) {
	return {
		type: TAB_SELECTED,
		payload: tabId
	}
}

export function showTabs(...tabIds) {
	const tabsToShow = {}
	tabIds.forEach(e => tabsToShow[e] = true);
	return {
		type: TAB_SHOWED,
		payload: tabsToShow
	}
}
