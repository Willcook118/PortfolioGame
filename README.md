ROUGH README NOTES

To setup and play run the folling commands through terminal - 

**To run first time**
- npm i
- npm run db:init
- node server.js

npm i installs any dependencies needed
npm run db:init will run 2 scripts to created the database file called game.db and populate with data needed
node app.js will run the server served with express.js

After first time running only "node app.js" will need to be used to run the server using node 

**To test **
- npm run cy:run
- npm run test (jest tests)

**Server is located at localhost:3000 , access registration page via http://localhost:3000/auth/register**
