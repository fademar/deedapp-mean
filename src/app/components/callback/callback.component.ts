import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({ template: `` })
export class CallbackComponent {

  constructor(private okta: AuthService) {
    // Handles the response from Okta and parses tokens
    okta.handleAuthentication();
  }
}
