import { widgetLayoutConstants } from '../constants'

export const widgetLayoutActions = {
  update, 
  clear
}

function update(layouts) {
  return {
    type: widgetLayoutConstants.UPDATE,
    layouts,
  }
}

function clear() {
  return {
    type: widgetLayoutConstants.CLEAR
  }
}