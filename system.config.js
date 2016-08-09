System.config({
  map: {
    app: 'src',
    angular2: 'node_modules/angular2',
    rxjs: 'node_modules/rxjs'
  },
  packages: {
    app: {
      defaultExtension: 'js',
      main: 'app.js'
    },
    angular2: {
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }
});
