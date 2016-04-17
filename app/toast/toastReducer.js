import * as Actions from './ToastActions';

const initialState = {
  thinking: false,
  message: false,
  type: false,
};
const methods = {};

export default function handle(state = initialState, action) {
  if (action.type in methods) {
    const result = Object.assign({}, state);
    return methods[action.type](result, action);
  }
  return state;
}

methods[Actions.ERROR] = function(state, action) {
  state.type = 'error';
  state.message = action.message || action.error.getMessage();
  return state
}

methods[Actions.THINK] = function(state, action) {
  state.thinking = action.done;
  return state;
}
