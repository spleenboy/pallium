import * as Actions from './ToastActions';

const initialState = {
  thinking: false,
  messages: [],
};
const methods = {};

export default function handle(state = initialState, action) {
  if (action.type in methods) {
    return methods[action.type](state, action);
  }
  return state;
}

methods[Actions.CLEAR] = function(state, action) {
  const result = Object.assign({}, state);
  result.messages = [];
  return result;
}

methods[Actions.ADD] = function(state, action) {
  const result = Object.assign({}, state);
  result.messages.unshift(action.message);
  return result;
}

methods[Actions.DISMISS] = function(state, action) {
  const result = Object.assign({}, state);
  result.messages.splice(action.index, 1);
  return result;
}

methods[Actions.THINK] = function(state, action) {
  const result = Object.assign({}, state);
  result.thinking = action.done;
  return result;
}
