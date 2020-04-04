import React, { useState } from "react";
import { Draggable, Layout, WidgetResolver, DummyBox } from "../components";
import { useSelector, useDispatch, useStore } from "react-redux";
import { widgetsActions, widgetLayoutActions } from "../actions";
import { Responsive, WidthProvider } from "react-grid-layout";

const HomePage = () => {
  const store = useStore();
  const widgets = useSelector((state) => state.widgets);
  const layout = useSelector((state) => state.widgetLayout);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      widgetLayoutActions.update(
        JSON.parse(localStorage.getItem("widgetLayout"))
      )
    );
    dispatch(widgetsActions.add({}, "DummyBox"));
  };

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const handleLayoutChange = (layout, layouts) => {
    localStorage.setItem("widgetLayout", JSON.stringify(layouts));
  };

  const handleDrop = (elemParams) => {
    const {x, y, w, h} = elemParams;
    dispatch(widgetsActions.add({x, y, w, h}, "DummyBox"));
  }

  return (
    <Layout>
      <div className="main">
        <ResponsiveGridLayout
          breakpoints={{ desk: 768, mob: 0 }}
          cols={{ desk: 12, mob: 1 }}
          className="layout"
          // layouts={layout}
          // onLayoutChange={(layout, layouts) =>
          //   handleLayoutChange(layout, layouts)
          // }
          verticalCompact={false}
          preventCollision={true}
          onDrop={handleDrop}
          isDroppable={true}
        >
          {widgets.map((widget) => (
            <div key={widget.id} data-grid={{x: widget.props.x, y: widget.props.y, w: widget.props.w, h: widget.props.h}}>
              <WidgetResolver
                type={widget.type}
                props={widget.props}
                id={widget.id}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
        <div className="component-sidebar">
          <div
            className="droppable-element"
            draggable={true}
            unselectable="on"
            onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
