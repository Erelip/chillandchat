export interface ExternalIdentity {
  provider: string;
  providerId: string;

  email: string;
  emailVerified: boolean;

  firstName?: string;
  lastName?: string;
  picture?: string;
}

export abstract class IdentityProvider {
  abstract getAuthorizationUrl(state: string): string;

  abstract authenticate(
    authorizationCode: string,
  ): Promise<ExternalIdentity>;
}
