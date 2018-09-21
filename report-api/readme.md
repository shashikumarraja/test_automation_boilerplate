REPORT API
=============
This project Express and mongoose to write and expose APIs which can be used in test to save test report data to mongo db and then utilized by a report project (written in html,css,js or react or any other framework) to display the test run report data.

#How to Run Tests

Tests are written using a javscript test framework [ava](https://github.com/avajs/ava) which allows to run tests concurrently unlike mocha.

To run tests:
```bash
npm test
```
To run converage:
```bash
npm run coverage
```
To run liniting the project uses [xo](https://github.com/xojs/xo) 

```bash
npm run lint
```