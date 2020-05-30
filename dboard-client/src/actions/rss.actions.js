import { rssConstants } from "../constants/rss.constants";
import { fetchFeed } from "../utils/rssFeed";

export const rssActions = {
  fetchRssDataIfNeeded,
  addRssFeed,
  removeWidget,
};

function fetchRssDataIfNeeded(id, url, forced) {
  return (dispatch, getState) => {
    console.log(getState().rss[id]);
    if (
      shouldFetchRssData(
        getState().rss[id] ? getState().rss[id] : undefined,
        forced,
        url
      )
    ) {
      return dispatch(fetchRssData(id, url));
    }
  };
}

function shouldFetchRssData(rssData, forced, url) {
  if (!rssData || !rssData.feed) {
    return true;
  } else if (rssData.isLoading) {
    return false;
  } else if (forced) {
    return true;
  }
}

function fetchRssData(id, url) {
  return async (dispatch) => {
    dispatch(requestRssData(id));
    const response = await fetchFeed(url);
    return dispatch(receiveRssData(id, response));
  };
}

function requestRssData(id) {
  return { type: rssConstants.REQUEST_RSS, id };
}

function receiveRssData(id, results) {
  return {
    type: rssConstants.RECEIVE_RSS,
    id,
    data: results,
    lastFetched: new Date(),
  };
}

function addRssFeed(id) {
  return { type: rssConstants.ADD_RSS, id };
}

function removeWidget(id) {
  return { type: rssConstants.REMOVE_WIDGET, id };
}
