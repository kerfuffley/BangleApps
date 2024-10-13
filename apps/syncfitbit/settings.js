(function (back) {
    var clientId, authCode;
    var SETTINGS_FILE = "syncfitbit.setting.json";
    var storage = require("Storage");
    var settings = (storage.readJSON(SETTINGS_FILE, true) || {});
    (clientId = settings.clientid) !== null && clientId !== void 0 ? clientId : (settings.clientid = '');
    (authCode = settings.authcode) !== null && authCode !== void 0 ? authCode : (settings.authcode = '');
    var save = function () {
        storage.writeJSON(SETTINGS_FILE, settings);
    };
    var menu = {
        "": { "title": "Sync to Fitbit" },
        "< Back": back
    };
    //E.showMenu(menu);
});
