export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export const JWT_CONFIG: JwtConfig = {
  secret: process.env.JWT_SECRET || 'votre-secret-super-securise-changez-moi',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};
