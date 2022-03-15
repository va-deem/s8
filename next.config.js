const path = require('path');

module.exports = {
  future: {
    webpack5: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
