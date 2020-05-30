import { authHeader } from "../helpers/auth-header";
import { widgetsConstants } from "../constants";
import { notesService } from "./notes.service";
import { handleResponse } from "../utils/responseUtils";

export const widgetService = {
  addWidget,
  fetchWidgets,
  updateLayout,
  deleteWidget,
  updateWidget,
};

function addWidget(widget) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      clientId: widget.id,
      type: widget.widgetType,
      props: JSON.stringify(widget.props),
    }),
  };
  fetch(`${process.env.config.apiUrl}/api/widgets`, requestOptions)
    .then(handleResponse)
    .then(() => {
      addLayout(widget.id, widget.layout);
      if (widget.widgetType === "Notes") {
        notesService.addNote(widget.id);
      }
    });
  return { type: widgetsConstants.ADD_SERVER };
}

function updateWidget(id, props) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({
      clientId: id,
      props: JSON.stringify(props),
    }),
  };
  fetch(`${process.env.config.apiUrl}/api/widgets`, requestOptions).then(
    handleResponse
  );
}

function deleteWidget(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
    body: JSON.stringify({
      clientId: id,
    }),
  };
  fetch(`${process.env.config.apiUrl}/api/widgets`, requestOptions).then(
    handleResponse
  );
}

function addLayout(id, layout) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      clientId: id,
      layouts: [layout.mob, layout.desk],
    }),
  };

  fetch(`${process.env.config.apiUrl}/api/widgets/layout`, requestOptions).then(
    handleResponse
  );
}

function updateLayout(requestLayouts) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({
      updatableElements: requestLayouts.desk
        .map((x) => ({
          clientId: parseInt(x.i),
          layouts: [
            {
              ...x,
              breakpoint: "desk",
            },
          ],
        }))
        .concat(
          requestLayouts.mob.map((x) => ({
            clientId: parseInt(x.i),
            layouts: [
              {
                ...x,
                breakpoint: "mob",
              },
            ],
          }))
        ),
    }),
  };
  fetch(`${process.env.config.apiUrl}/api/widgets/layout`, requestOptions).then(
    handleResponse
  );
}

function fetchWidgets() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${process.env.config.apiUrl}/api/widgets`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      const widgets = data.widgetList.map((el) => {
        return { id: el.clientId, props: JSON.parse(el.props), type: el.type };
      });
      const nextId =
        Math.max.apply(
          Math,
          widgets.map(function (o) {
            return o.id;
          })
        ) + 1;
      localStorage.setItem("widgets", JSON.stringify({ nextId, widgets }));
    });
}
