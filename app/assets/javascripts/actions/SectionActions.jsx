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
    EventEmitter.emit("HideSectionDialogWindow", 'hide');
  }

}
var SectionActions = new SectionActions();
module.exports = SectionActions;
