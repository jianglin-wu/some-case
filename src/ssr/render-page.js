import serialize from 'serialize-javascript';
import prettier from 'prettier';

const renderPage = (reactDom, reduxState, { isPrettier }) => {
  let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>some-case</title>
</head>
<body>
  <div id="root">${reactDom}</div>
  <script>
    window.__PRELOADED_STATE__ = ${serialize(reduxState, { isJSON: true })}
  </script>
  <script src="/index.js"></script>
</body>
</html>
  `.trim();
  if (isPrettier) {
    htmlContent = prettier.format(htmlContent, { parser: 'html' });
  }
  return htmlContent;
};

export default renderPage;
