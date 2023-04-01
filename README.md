## Overview
- `pages/api/*` - API routes

## Running Locally

```bash
$ yarn dev
```
and go to http://localhost:3000


### Possible errors:
if you get an error like this:
```
Invalid `prisma.post.findMany()` invocation:
connect ECONNREFUSED ::1:54434
```
that is because of prisma and Node version. You need to use Node version from `.nvmrc` file. You can use nvm to install it. 
```
nvm install
```
