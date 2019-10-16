import counter from './counter';
import posts from './posts';

export default app => {
  app.model(counter);
  app.model(posts);
};
