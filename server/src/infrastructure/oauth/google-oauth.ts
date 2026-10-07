import { OAuth2Client } from 'google-auth-library';
import { ExternalIdentity, IdentityProvider } from '../../core/interfaces/identity-provider.interface';

export class GoogleOAuthAdapter implements IdentityProvider {

  private readonly client: OAuth2Client;

  constructor(
    clientId: string,
    clientSecret: string,
    callbackUrl: string,
  ) {
    this.client = new OAuth2Client(
      clientId,
      clientSecret,
      callbackUrl,
    );
  }

  getAuthorizationUrl(state: string): string {
    return this.client.generateAuthUrl({
      access_type: 'online',
      scope: [
        'openid',
        'email',
        'profile',
      ],
      state: state,
      prompt: 'select_account',
    });
  }

  async authenticate(
    authorizationCode: string,
  ): Promise<ExternalIdentity> {
    const { tokens } = await this.client.getToken(authorizationCode);

    if (!tokens.id_token) {
      throw new Error(
        'Google did not return an ID token',
      );
    }

    const ticket = await this.client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email) {
      throw new Error('Invalid Google identity');
    }

    return {
      provider: 'google',
      providerId: payload.sub,

      email: payload.email,
      emailVerified: payload.email_verified === true,

      firstName: payload.given_name,
      lastName: payload.family_name,
      picture: payload.picture,
    };
  }
}
