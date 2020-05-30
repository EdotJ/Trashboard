import React, { useEffect, useState, useRef } from "react";
import { BaseCard } from "./BaseCard";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { widgetsActions, widgetLayoutActions, rssActions } from "../actions";
import { Loader } from "./Loader";

export const RssFeed = ({ id, url, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const data = useSelector((state) => state.rss[id]);
  const dispatch = useDispatch();
  const urlInput = useRef(null);
  const titleInput = useRef(null);

  useEffect(() => {
    if (url && url.length > 0) {
      dispatch(rssActions.fetchRssDataIfNeeded(id, url, false));
    }
  }, [dispatch, id, url]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const updateUrl = () => {
    const rssUrl = urlInput.current.input.value;
    const title = titleInput.current.input.value;
    if (
      localStorage.getItem("widgetLayout") &&
      JSON.parse(localStorage.getItem("widgetLayout")).desk.length > 0
    ) {
      dispatch(
        widgetLayoutActions.update(
          JSON.parse(localStorage.getItem("widgetLayout"))
        )
      );
    }
    dispatch(widgetsActions.update({ url: rssUrl, title }, id));
    if (url !== rssUrl) {
      dispatch(rssActions.fetchRssDataIfNeeded(id, rssUrl, true));
    }
    toggleModal();
  };
  return (
    <BaseCard className="rss-base" id={id}>
      <FontAwesomeIcon
        className="rss-settings"
        icon={faCog}
        onClick={toggleModal}
      />
      {title && title.length > 0 && (
        <div className="rss-card-title">{title}</div>
      )}
      {data && data.isLoading ? (
        <Loader size="medium" />
      ) : (
        <>
          {data &&
            data.feed &&
            data.feed.map((el, i) => (
              <div key={i} className="rss-feed-element">
                <a
                  className="rss-feed-title"
                  href={el.comments ? el.comments : el.link}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {el.title}
                </a>
                <span className="rss-author">
                  &nbsp;by {el.creator ? el.creator : el.author}
                </span>
                <span className="rss-date">
                  &nbsp;on {el.isoDate.substring(0, 10)}
                </span>
              </div>
            ))}
        </>
      )}
      <Modal visible={isVisible} onCancel={toggleModal} onOk={updateUrl}>
        <div className="rss-input-container">
          <Input addonBefore="Title" ref={titleInput} defaultValue={title} />
          <Input addonBefore="URL" ref={urlInput} defaultValue={url} />
        </div>
      </Modal>
    </BaseCard>
  );
};
