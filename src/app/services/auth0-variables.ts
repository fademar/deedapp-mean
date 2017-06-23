interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'RlqH0baoNguqnJ1X9BG2cbFTqRUy271I',
  domain: 'cercec.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
