module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Puedes agregar opciones de configuración para Jasmine aquí
      },
      clearContext: false // deja visible la salida de Jasmine Spec Runner en el navegador
    },
    jasmineHtmlReporter: {
      suppressAll: true // elimina las trazas duplicadas
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/code-five.client'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--no-sandbox',
          '--disable-gpu',
          '--remote-debugging-port=9222',
        ],
      },
    },
    singleRun: false,
    restartOnFileChange: true
  });
};

