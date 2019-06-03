import { DeedappMeanPage } from './app.po';

describe('deedapp-mean App', () => {
  let page: DeedappMeanPage;

  beforeEach(() => {
    page = new DeedappMeanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
