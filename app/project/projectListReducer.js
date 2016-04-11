import * as Actions from './ProjectListActions';
const initialState = [];
const methods = {};

methods[Actions.LOAD] = function(state, action) {
  return [
  {
    title: "Test project",
    path: "./test.js",
  },
  {
    title: "Second Test project",
    path: "./second-test.js",
  },
  ];
}

export default function handle(state = initialState, action) {
  if (action.type in methods) {
    return methods[action.type](state, action);
  }
  return state;
}
