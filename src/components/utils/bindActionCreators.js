// 类似 redux 中的 bindActionCreators，不过多了增加 namespace 的逻辑，用于简化 Dva
function bindActionCreator(actionCreator, dispatch, namespace) {
  return (that, ...args) => {
    const action = actionCreator.apply(that, args);
    if (namespace) {
      action.type = `${namespace}/${action.type}`;
    }
    return dispatch(action);
  };
}

export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`,
    );
  }

  const boundActionCreators = {};
  const namespace = actionCreators.namespace || '';
  Object.keys(actionCreators).forEach(key => {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch, namespace);
    }
  });
  return boundActionCreators;
}
