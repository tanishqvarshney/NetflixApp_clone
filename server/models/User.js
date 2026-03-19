const { MockModel } = require('../mockDb');
const bcrypt = require('bcryptjs');

module.exports = class MockUser extends MockModel {
  async matchPassword(enteredPassword) {
    if (!this.password || this.password.startsWith('$2')) { // If hashed
       return await bcrypt.compare(enteredPassword, this.password);
    }
    return enteredPassword === this.password;
  }
};
