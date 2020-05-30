import { appStateConstants } from "../constants";

export const appStateActions = {
  toggleExpansion,
};

function toggleExpansion() {
  return { type: appStateConstants.TOGGLE_EXPANSION };
}
