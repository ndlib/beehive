var AppDispatcher = require("../dispatcher/AppDispatcher");
var SectionActionTypes = require("../constants/SectionActionTypes");
var EventEmitter = require("../EventEmitter");

class SectionActions {
  setCurrentSection(section) {
    AppDispatcher.dispatch({
      actionType: SectionActionTypes.SECTION_SET_SECTION,
      section: section
    });
  }

  showSectionDialogWindow(section) {
    EventEmitter.emit("SectionDialogWindow", section);
  }

  hideSectionDialogWindow() {
    this.setCurrentSection(null);
    window.location.hash = "";
    EventEmitter.emit("SectionDialogWindow", 'hide');
  }

}
var SectionActions = new SectionActions();
module.exports = SectionActions;
