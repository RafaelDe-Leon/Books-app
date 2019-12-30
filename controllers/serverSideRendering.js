import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../client/src/App';

module.exports = {
 serverRenderer : (req, res, next) => {
  console.log(App);
  const appComponent = ReactDOMServer.renderToString(<App ssr/>)

  fs.readFile(path.resolve('./client/build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    console.log("\n\n\nssr")
    // const app = ReactDOMServer.renderToString(<App />)
    console.log(`appComponent: ${appComponent}`);
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${appComponent}</div>`
      )
    )
  })
}
}