type Credential = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
};

export function getCredentials(base64Credentials: string): Credential {
  const decodedServiceAccount = Buffer.from(
    base64Credentials,
    'base64',
  ).toString('utf-8');

  return JSON.parse(decodedServiceAccount) as Credential;
}
