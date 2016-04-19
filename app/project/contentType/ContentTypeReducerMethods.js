import * as Actions from './ContentTypeActions';

const methods = {};

methods[Actions.SELECT_CONTENT_TYPE] = function(state, action) {
  if (!state || !state.contentTypes) {
    return state;
  }

  const result = Object.assign({}, state);
  result.contentType = state.contentTypes.find(ct => ct.settings.handle === action.handle);

  return result;
}

export default methods;
