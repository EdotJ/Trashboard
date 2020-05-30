package com.dboard.main.controller;

import com.dboard.main.model.LayoutElement;
import com.dboard.main.model.Widget;
import com.dboard.main.payload.ApiResponse;
import com.dboard.main.payload.Widget.AddWidgetResponse;
import com.dboard.main.payload.Widget.Layout.AddLayoutResponse;
import com.dboard.main.payload.Widget.Layout.BulkLayoutUpdateRequest;
import com.dboard.main.payload.Widget.Layout.LayoutRequest;
import com.dboard.main.payload.Widget.Layout.LayoutResponse;
import com.dboard.main.payload.Widget.UpdateWidgetRequest;
import com.dboard.main.payload.Widget.WidgetDeleteRequest;
import com.dboard.main.payload.Widget.WidgetRequest;
import com.dboard.main.payload.Widget.WidgetResponse;
import com.dboard.main.repository.UserRepository;
import com.dboard.main.repository.WidgetRepository;
import com.dboard.main.security.CurrentUser;
import com.dboard.main.security.UserPrincipal;
import com.dboard.main.service.WidgetService;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/widgets")
@PreAuthorize("hasRole('USER')")
public class WidgetController {

  private final WidgetRepository widgetRepository;

  private final UserRepository userRepository;

  private final WidgetService widgetService;

  private static final Logger logger =
      LoggerFactory.getLogger(WidgetController.class);

  public WidgetController(WidgetRepository widgetRepository,
                          UserRepository userRepository,
                          WidgetService widgetService) {
    this.widgetRepository = widgetRepository;
    this.userRepository = userRepository;
    this.widgetService = widgetService;
  }

  @GetMapping
  public WidgetResponse getWidgets(@CurrentUser UserPrincipal currentUser) {
    return widgetService.getAllWidgetsCreatedBy(currentUser);
  }

  @PostMapping
  public ResponseEntity<?>
  createWidget(@Valid @RequestBody WidgetRequest widgetRequest) {
    Widget widget = widgetService.createWidget(widgetRequest);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                       .path("/{widgetId}")
                       .buildAndExpand(widget.getId())
                       .toUri();
    return ResponseEntity.created(location).body(
        new AddWidgetResponse(true, "Successfully created widget", widget));
  }

  @DeleteMapping
  public ResponseEntity<?>
  deleteWidget(@Valid @RequestBody WidgetDeleteRequest widgetRequest,
               @CurrentUser UserPrincipal user) {
    widgetService.deleteWidget(widgetRequest.getClientId(), user.getId());
    return ResponseEntity.ok(
        new ApiResponse(true, "Successfully deleted widget"));
  }

  @PutMapping
  public ResponseEntity<?>
  updateWidget(@Valid @RequestBody UpdateWidgetRequest request,
               @CurrentUser UserPrincipal user) {
    widgetService.updateWidget(request, user);
    return ResponseEntity.ok(new ApiResponse(
        true, "Successfully updated widget " + request.getClientId()));
  }

  @GetMapping("/layout")
  public LayoutResponse getLayouts(@CurrentUser UserPrincipal currentUser) {
    return widgetService.getAllLayoutsCreatedBy(currentUser);
  }

  @PostMapping("/layout")
  public ResponseEntity<?>
  addLayout(@Valid @RequestBody LayoutRequest layoutRequest,
            @CurrentUser UserPrincipal currentUser) {
    List<LayoutElement> layouts = widgetService.createLayout(layoutRequest);
    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                       .path("/")
                       .build()
                       .toUri();
    return ResponseEntity.created(location).body(
        new AddLayoutResponse(true, "Successfully refreshed layouts", layouts));
  }

  @PutMapping("/layout")
  public ResponseEntity<?>
  refreshLayout(@Valid @RequestBody BulkLayoutUpdateRequest layoutRequest,
                @CurrentUser UserPrincipal currentUser) {
    List<LayoutElement> layouts = new ArrayList<>();
    for (LayoutRequest layout : layoutRequest.getUpdatableElements()) {
      layouts.addAll(widgetService.updateLayout(layout, currentUser));
    }
    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                       .path("/")
                       .build()
                       .toUri();
    return ResponseEntity.created(location).body(
        new AddLayoutResponse(true, "Successfully updated layouts", layouts));
  }
}
