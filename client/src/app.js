
export class App {
  configureRouter(config, router) {
    config.title = 'Library Instruction Statistics Database';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'components/welcome/welcome',      nav: true, title: 'Welcome' },
      { route: ['users', 'users'], name: 'users',      moduleId: 'components/users/users',      nav: true, title: 'Users' }
    ]);

    this.router = router;
  }
}