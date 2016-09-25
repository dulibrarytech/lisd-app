
export class App {
  configureRouter(config, router) {
    config.title = 'Library Instruction Statistics Database';
    config.map([
      { route: ['', 'home'], name: 'home',      moduleId: 'components/home/home',      nav: true, title: 'Home' },
      { route: ['users', 'users'], name: 'users',      moduleId: 'components/users/users',      nav: true, title: 'Users' },
      { route: ['entryform', 'entryform'], name: 'entryform',      moduleId: 'components/entryform/entryform',      nav: true, title: 'Entry Form' }
    ]);

    this.router = router;
  }
}