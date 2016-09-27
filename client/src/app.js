
export class App {
  configureRouter(config, router) {
    config.title = 'Library Instruction Statistics Database';
    config.map([
      { route: ['', 'entryform'], name: 'entryform',      moduleId: 'components/entryform/entryform',      nav: true, title: 'Entry Form' },
      { route: ['admin', 'admin'], name: 'admin',      moduleId: 'components/admin/admin',      nav: true, title: 'Admin' }
    ]);

    this.router = router;
  }
}