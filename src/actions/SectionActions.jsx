"use strict"
var AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
var SectionActionTypes = require("../constants/SectionActionTypes.jsx");
var EventEmitter = require("../middleware/EventEmitter.js");

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
module.exports = new SectionActions();
//export default SectionActions;
