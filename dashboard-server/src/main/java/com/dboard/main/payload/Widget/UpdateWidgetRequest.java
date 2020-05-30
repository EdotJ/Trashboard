package com.dboard.main.payload.Widget;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UpdateWidgetRequest {

  @NotNull private Long clientId;

  @NotBlank private String props;

  public Long getClientId() { return clientId; }

  public void setClientId(Long clientId) { this.clientId = clientId; }

  public String getProps() { return props; }

  public void setProps(String props) { this.props = props; }
}
