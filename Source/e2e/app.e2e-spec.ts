import { ParkingAppWebPage } from './app.po';

describe('parking-app-web App', () => {
  let page: ParkingAppWebPage;

  beforeEach(() => {
    page = new ParkingAppWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
