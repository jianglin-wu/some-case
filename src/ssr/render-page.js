import path from 'path';
import glob from 'glob';
import serialize from 'serialize-javascript';
import prettier from 'prettier';

const distPath = path.resolve(__dirname, '../../dist');
const indexJsPath = glob.sync(`${distPath}/index.*.js`)[0] || '/index.js';
const indexCssPath = glob.sync(`${distPath}/index.*.css`)[0] || '/index.css';

const renderPage = (reactDom, reduxState, { isPrettier, helmet }) => {
  const { title, meta, link } = helmet;
  let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  ${title}
  <meta charset="utf-8">${meta}
  ${link}<link crossorigin="anonymous" rel="stylesheet" href="${indexCssPath.replace(
    distPath,
    '',
  )}" />
</head>
<body>
  <div id="root">${reactDom}</div>
  <script>
    window.__PRELOADED_STATE__ = ${serialize(reduxState, { isJSON: true })}
  </script>
  <script crossorigin="anonymous" src="${indexJsPath.replace(distPath, '')}"></script>
</body>
</html>
  `.trim();
  if (isPrettier) {
    htmlContent = prettier.format(htmlContent, { parser: 'html' });
  }
  return htmlContent;
};

export default renderPage;
