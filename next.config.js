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
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
