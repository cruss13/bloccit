const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

  update() {
    return this.edit() &&
    this.record && (this._isOwner() || this._isAdmin());
  }

  destroy() {
    return this.update () &&
      this.record && (this._isOwner() || this._isAdmin());
  }
}
