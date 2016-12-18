
export class App {
  configureRouter(config, router) {
    config.title = 'Library Instruction Statistics Database';
    config.map([
      { route: ['', 'entryform'], name: 'entryform',      moduleId: 'components/entryform/entryform',      nav: true, title: 'Entry Form' },
      { route: ['statistics', 'statistics'], name: 'statistics',      moduleId: 'components/statistics/statistics',      nav: true, title: 'Statistics' }
    ]);

    this.router = router;
  }
}