export default class MockBankIdClient {
  container = document.getElementById('bank-id-mock');
  loggedInButton = document.getElementById('bank-id-logged-in');
  authHandler = null;

  constructor(container) {
    this.localStorage = container.getAsync('storage').then(({ local }) => local);
    this.localStorage.then(
      local =>
        local
          .getItem('bank-id-token')
          .then((loggedIn) => {
            if (loggedIn) {
              this.loggedInButton.setAttribute('data-logged-in', 'true');
            } else {
              this.loggedInButton.setAttribute('data-logged-in', 'false');
            }
          }),
    );
  }

  onAuth = fn => this.authHandler = fn;

  start() {
    this.container.setAttribute('data-active', 'true');
  }

  authenticate() {
    this.container.setAttribute('data-loading', 'true');
    setTimeout(
      () => {
        this.authHandler && this.authHandler('mocked-token');
        this.loggedInButton.setAttribute('data-logged-in', 'true');
        this.container.setAttribute('data-loading', 'false');
        this.container.setAttribute('data-active', 'false');
      },
      Math.floor(Math.random() * Math.floor(3000)),
    );
  }

  logOut() {
    this.loggedInButton.setAttribute('data-logged-in', 'false');
    this.localStorage.then(local => local.removeItem('bank-id-token'));
  }
}