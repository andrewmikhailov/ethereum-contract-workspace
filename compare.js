var web3Utils = require('web3-utils');
module.exports = {
    compareWei: function (first, second) {
        return Math.round(web3Utils.fromWei("" + first), 5) == Math.round(web3Utils.fromWei("" + second), 5);
    }
};