
export class App {
  configureRouter(config, router) {
    config.title = 'Library Instruction Statistics Database';
    config.map([
      { route: ['', 'entryform'], name: 'entryform',      moduleId: 'components/entryform/entryform',      nav: true, title: 'Entry Form' },
      { route: ['statistics', 'statistics'], name: 'statistics',      moduleId: 'components/statistics/statistics',      nav: true, title: 'Statistics' },
      { route: ['login', 'login'], name: 'login',      moduleId: 'components/login/login',      nav: true, title: 'Login' }, // disable
      { route: ['loginSSO', 'loginSSO'], name: 'components/login/loginSSO',      moduleId: 'components/login/loginSSO',      nav: false },
      { route: ['admin', 'admin'], name: 'admin',      moduleId: 'components/dashboard/dashboard',      nav: true, title: 'Admin' }
    ]);

    this.router = router;
  }
}