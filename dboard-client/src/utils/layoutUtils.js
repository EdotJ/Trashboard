export const constructMobileWidget = (state, payload) => {
  const maxY = state.reduce(
    (prev, current) => (prev.y > current.y ? prev : current),
    { y: -1 }
  );
  return {
    i: payload.id,
    x: 0,
    y: maxY.y + 1,
    w: 1,
    h: payload.size.h,
    minW: 0,
    minH: payload.size.minH ? payload.size.minH : 0,
    static: false,
    breakpoint: "mob",
  };
};

export const constructDesktopWidget = (state, payload) => {
  const currentState = JSON.parse(localStorage.getItem("widgetLayout")).desk;
  let row = 0;
  let minY = getMinYRow(0, currentState);
  for (let i = 1; i < 12; i++) {
    if (getMinYRow(i, currentState).y < minY.y) {
      minY = getMinYRow(i, currentState);
    }
  }
  return {
    i: payload.id,
    x: minY.x,
    y: minY.y + minY.h,
    w: payload.size.w,
    h: payload.size.h,
    minW: payload.size.minW ? payload.size.minW : 0,
    minH: payload.size.minH ? payload.size.minH : 0,
    static: false,
    breakpoint: "desk",
  };
};

const getMinYRow = (row, state) => {
  return state.reduce(
    (prev, current) =>
      prev.y + prev.h < current.y + current.h && current.x === row
        ? prev
        : current,
    { y: 0 }
  );
};
