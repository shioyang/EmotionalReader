import { ERClientPage } from './app.po';

describe('erclient App', function() {
  let page: ERClientPage;

  beforeEach(() => {
    page = new ERClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
