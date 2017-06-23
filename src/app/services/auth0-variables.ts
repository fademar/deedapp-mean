interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'RlqH0baoNguqnJ1X9BG2cbFTqRUy271I',
  CLIENT_DOMAIN: 'cercec.eu.auth0.com',
  AUDIENCE: 'deed-app-api',
  REDIRECT: 'http://localhost:4200/callback',
  SCOPE: 'openid'
};