package com.dboard.main.service;

import com.dboard.main.model.*;
import com.dboard.main.payload.BadRequestException;
import com.dboard.main.payload.Widget.Layout.LayoutRequest;
import com.dboard.main.payload.Widget.Layout.LayoutResponse;
import com.dboard.main.payload.Widget.Layout.RequestLayoutElement;
import com.dboard.main.payload.Widget.UpdateWidgetRequest;
import com.dboard.main.payload.Widget.WidgetRequest;
import com.dboard.main.payload.Widget.WidgetResponse;
import com.dboard.main.repository.BreakpointRepository;
import com.dboard.main.repository.LayoutRepository;
import com.dboard.main.repository.UserRepository;
import com.dboard.main.repository.WidgetRepository;
import com.dboard.main.security.UserPrincipal;
import com.dboard.main.utils.ModelMapper;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class WidgetService {

  private WidgetRepository widgetRepository;

  private UserRepository userRepository;

  private LayoutRepository layoutRepository;

  BreakpointRepository breakpointRepository;

  private static final Logger logger =
      LoggerFactory.getLogger(WidgetService.class);

  public WidgetService(WidgetRepository widgetRepository,
                       UserRepository userRepository,
                       LayoutRepository layoutRepository,
                       BreakpointRepository breakpointRepository) {
    this.widgetRepository = widgetRepository;
    this.userRepository = userRepository;
    this.layoutRepository = layoutRepository;
    this.breakpointRepository = breakpointRepository;
  }

  public WidgetResponse getAllWidgetsCreatedBy(UserPrincipal currentUser) {
    List<Widget> widgets =
        widgetRepository.findByCreatedBy(currentUser.getId());
    Optional<User> user = userRepository.findById(currentUser.getId());
    return ModelMapper.mapWidgetToWidgetResponse(widgets, user.get());
  }

  public Widget createWidget(WidgetRequest widgetRequest) {
    Widget widget = new Widget();
    widget.setType(widgetRequest.getType());
    widget.setProps(widgetRequest.getProps());
    widget.setClientId(widgetRequest.getClientId());
    return widgetRepository.save(widget);
  }

  public LayoutResponse getAllLayoutsCreatedBy(UserPrincipal currentUser) {
    List<LayoutElement> elements =
        layoutRepository.findByCreatedBy(currentUser.getId());
    Map<String, List<LayoutElement>> elementsByBreakpoint =
        elements.stream().collect(
            Collectors.groupingBy(e -> e.getBreakpoint().getName().toString()));
    Optional<User> user = userRepository.findById(currentUser.getId());
    return ModelMapper.mapLayoutToLayoutResponse(elementsByBreakpoint,
                                                 user.get());
  }

  public List<LayoutElement> createLayout(LayoutRequest layoutRequest) {
    List<LayoutElement> createdElements = new ArrayList<>();
    for (RequestLayoutElement reqEl : layoutRequest.getLayouts()) {
      LayoutElement element = new LayoutElement();
      setLayoutElement(reqEl, element);
      element.setBreakpoint(breakpointRepository.getBreakpointByName(
          BreakpointName.valueOf(reqEl.getBreakpoint())));
      createdElements.add(layoutRepository.save(element));
    }
    return createdElements;
  }

  public List<LayoutElement> updateLayout(LayoutRequest request,
                                          UserPrincipal currentUser) {
    List<LayoutElement> updatedElements = new ArrayList<>();
    for (RequestLayoutElement reqEl : request.getLayouts()) {
      updateElement(currentUser, updatedElements, reqEl);
    }
    return updatedElements;
  }

  private void updateElement(UserPrincipal currentUser,
                             List<LayoutElement> updatedElements,
                             RequestLayoutElement reqEl) {
    LayoutElement element =
        layoutRepository.findByCreatedByAndWebKeyAndBreakpointName(
            currentUser.getId(), reqEl.getI(),
            BreakpointName.valueOf(reqEl.getBreakpoint()));
    if (element != null) {
      setLayoutElement(reqEl, element);
      updatedElements.add(layoutRepository.save(element));
    }
  }

  private void setLayoutElement(RequestLayoutElement reqEl,
                                LayoutElement element) {
    element.setX(reqEl.getX());
    element.setY(reqEl.getY());
    element.setH(reqEl.getH());
    element.setW(reqEl.getW());
    element.setMinH(reqEl.getMinH());
    element.setMinW(reqEl.getMinW());
    element.setStatic(reqEl.getStatic());
    element.setWebKey(reqEl.getI());
  }

  public void deleteWidget(Long clientId, Long userId) {
    List<LayoutElement> layoutElements =
        layoutRepository.findByWebKeyAndCreatedBy(clientId.toString(), userId);
    layoutRepository.deleteAll(layoutElements);
    Optional<Widget> widget =
        widgetRepository.findByCreatedByAndAndClientId(userId, clientId);
    widget.ifPresent(value -> widgetRepository.delete(value));
  }

  public void updateWidget(UpdateWidgetRequest request, UserPrincipal user) {
    Optional<Widget> optWidget = widgetRepository.findByCreatedByAndAndClientId(
        user.getId(), request.getClientId());
    if (!optWidget.isPresent()) {
      throw new BadRequestException("Could not find widget with id: " +
                                    request.getClientId());
    }
    Widget widget = optWidget.get();
    widget.setProps(request.getProps());
    widgetRepository.save(widget);
  }
}
