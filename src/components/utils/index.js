// eslint-disable-next-line import/prefer-default-export

export { default as bindActionCreators } from './bindActionCreators';

export { default as bindEffects } from './bindEffects';

export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export const noop = () => {};
