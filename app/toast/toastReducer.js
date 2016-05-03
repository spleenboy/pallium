import * as Actions from './ToastActions';

const initialState = {
  thinking: false,
  messages: [],
};
const methods = {};

export default function handle(state = initialState, action) {
  if (action.type in methods) {
    const result = Object.assign({}, state);
    return methods[action.type](result, action);
  }
  return state;
}

methods[Actions.CLEAR] = function(state, action) {
  state.messages = [];
  return state;
}

methods[Actions.ADD] = function(state, action) {
  state.messages.push(action.message);
  return state;
}

methods[Actions.DISMISS] = function(state, action) {
  state.messages.splice(action.index, 1);
  return state;
}

methods[Actions.THINK] = function(state, action) {
  state.thinking = action.done;
  return state;
}
