export default class MockBankIdClient {
  container = document.getElementById('bank-id-mock');
  authHandler = null;

  onAuth = fn => this.authHandler = fn;

  start() {
    this.container.setAttribute('data-active', 'true');
  }

  authenticate() {
    this.container.setAttribute('data-loading', 'true');
    setTimeout(
      () => {
        this.authHandler && this.authHandler('mocked-token');
        this.container.setAttribute('data-loading', 'false');
        this.container.setAttribute('data-active', 'false');
      },
      Math.floor(Math.random() * Math.floor(3000)),
    );
  }

}