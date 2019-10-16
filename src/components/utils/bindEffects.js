// 查找 loading 中的 effects 状态
export default function bindEffects(actionCreators) {
  const { namespace } = actionCreators;
  const effectNames = {};
  let effectLoadings = {};

  Object.keys(actionCreators).forEach(key => {
    if (typeof actionCreators[key] !== 'function') {
      return;
    }
    let typeName = actionCreators[key]().type;
    if (namespace) {
      typeName = `${namespace}/${typeName}`;
    }
    if (typeName) {
      effectNames[typeName] = key;
    }
  });

  return function findLoadings({ effects }) {
    const newEffectLoadings = {};
    let changed = false;

    Object.keys(effectNames).forEach(key => {
      const effectLoading = !!effects[key];
      if (effectLoadings[effectNames[key]] !== effectLoading) {
        changed = true;
      }
      newEffectLoadings[effectNames[key]] = effectLoading;
    });

    if (changed) {
      effectLoadings = newEffectLoadings;
    }

    return effectLoadings;
  };
}
