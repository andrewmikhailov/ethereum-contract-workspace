var baseTest = require('../base-test');
module.exports = baseTest;
baseTest.testAccounts = function (test) {
    test.ok(5 === module.exports.accounts.length, "Accounts should be created");
    test.done();
};
