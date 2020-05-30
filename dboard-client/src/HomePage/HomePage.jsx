import React, { useRef, useState } from "react";
import { WidgetDrawer, WidgetResolver } from "../components/Drawer";
import { Layout } from "../components";
import { useSelector } from "react-redux";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useEffect } from "react";
import { widgetService } from "../services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const widgetState = useSelector((state) => state.widgets);
  const layout = useSelector((state) => state.widgetLayout);
  const containerRef = useRef(null);
  const [breakpoint, setBreakpoint] = useState("desk");
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.clientHeight);
    }
  }, []);

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const handleLayoutChange = (layout, layouts) => {
    widgetService.updateLayout(layouts);
    localStorage.setItem("widgetLayout", JSON.stringify(layouts));
  };

  const handleBreakpointChange = (newBreakpoint) => {
    setBreakpoint(newBreakpoint);
    setHeight(containerRef.current.clientHeight);
  };

  const isDesktop = () => {
    return breakpoint === "desk";
  };

  const placeWidgets = () => {
    return (
      widgetState.widgets &&
      widgetState.widgets.map((widget, i) => (
        <div key={widget.id}>
          <WidgetResolver
            type={widget.type}
            props={widget.props}
            id={widget.id}
          />
        </div>
      ))
    );
  };

  return (
    <Layout>
      <div className="main" ref={containerRef}>
        {widgetState.widgets.length > 0 ? (
          <ResponsiveGridLayout
            breakpoints={{ desk: 768, mob: 0 }}
            cols={{ desk: 12, mob: 1 }}
            className="layout"
            layouts={layout}
            onLayoutChange={(layout, layouts) =>
              handleLayoutChange(layout, layouts)
            }
            onBreakpointChange={handleBreakpointChange}
            compactType={null}
            preventCollision={true}
            isDroppable={true}
            useCSSTransforms={false}
            maxRows={isDesktop() ? 8 : Infinity}
            rowHeight={isDesktop() ? (height - 86) / 8 : 150}
            margin={[10, 10]}
            draggableHandle=".draggable-div"
          >
            {placeWidgets()}
          </ResponsiveGridLayout>
        ) : (
          <div className="watermark-container">
            <span className="watermark">
              Add widgets via the drawer on the right
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="watermark-arrow" />
          </div>
        )}
        {isDesktop() ? <WidgetDrawer /> : ""}
      </div>
    </Layout>
  );
};

export default HomePage;
