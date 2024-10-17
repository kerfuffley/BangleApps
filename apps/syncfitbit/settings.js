(function(back) {
    function writeSettings(key, value) {
      var s = require('Storage').readJSON(FILE, true) || {};
      s[key] = value;
      require('Storage').writeJSON(FILE, s);
      readSettings();
    }
  
    function readSettings(){
      settings = Object.assign(
        require('Storage').readJSON('syncfitbit.default.json', true) || {},
        require('Storage').readJSON(FILE, true) || {}
      );
    }
  
    var FILE='syncfitbit.json';
    var settings;
    readSettings();
  
    function buildMainMenu(){
      var mainmenu = {
        '': { 'title': 'Sync to Fitbit' },
        '< Back': back,
        'Enabled': {
          value: !!settings.enabled,
          onchange: v => {
            writeSettings('enabled', v);
          }
        }
      };
  
      mainmenu['Client ID'] = function (){
        if (require('textinput')){
          require('textinput').input({text:settings.clientid}).then(result => {
            if (result != '') {
              print('Result is', result);
              settings.clientid = result;
              writeSettings('clientid',result);
            }
            E.showMenu(buildMainMenu());
          });
        }
        else {
          E.showAlert('Install a text input lib').then(()=>{
            E.showMenu(buildMainMenu());
          });
        }
      };

      mainmenu['Auth Code'] = function (){
        if (require('textinput')){
          require('textinput').input({text:settings.authcode}).then(result => {
            if (result != '') {
              print('Result is', result);
              settings.authcode = result;
              writeSettings('authcode',result);
            }
            E.showMenu(buildMainMenu());
          });
        }
        else {
          E.showAlert('Install a text input lib').then(()=>{
            E.showMenu(buildMainMenu());
          });
        }
      };
  
      return mainmenu;
    }
  
    E.showMenu(buildMainMenu());
  });