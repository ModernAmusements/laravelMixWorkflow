https://modernamusements.github.io/FFFCorp.github.io/index.html













# Worlflow 1.

  mkdir my-app && cd my-app
  npm init -y
  npm install laravel-mix --save-dev
  cp node_modules/laravel-mix/setup/webpack.mix.js ./

  node_modules/
  package.json
  webpack.mix.js

  Head over to your webpack.mix.js file:

  const mix = require('laravel-mix');

  mix.js('src/app.js', 'dist')
   .sass('src/app.scss', 'dist')
   .setPublicPath('dist');

  mkdir src && touch src/app.{js,scss}

  Compile everything down by running:
  node_modules/.bin/webpack --config=node_modules/laravel-mix/setup/webpack.config.js

  dist/app.css
  dist/app.js
  dist/mix-manifest.json (Your asset dump file, which we'll discuss later.)
  Nice job! Now get to work on that project.


 npm install postcss-css-variables --save-dev



node_modules/.bin/webpack --config=node_modules/laravel-mix/setup/webpack.config.js
# laravelMixWorkflow


# Worlflow 1.
npm install for nodeModules
refresh file view in vscode


Sharing Sites Via Ngrok
To share a site, navigate to the site's directory in your terminal and run the valet share command. A publicly accessible URL will be inserted into your clipboard and is ready to paste directly into your browser or share with your team.

To stop sharing your site, hit Control + C to cancel the process.

Test Push
