// Types pour la configuration CSRF
export interface CsrfConfig {
  sessionPlugin: string;
  cookieOpts: {
    path: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none';
  };
  ignoreMethods: string[];
  userInfo: boolean;
  sessionKey: string;
}

// Interface pour les options de cookie CSRF
export interface CsrfCookieOptions {
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  domain?: string;
}

// Interface pour la réponse CSRF
export interface CsrfResponse {
  csrfToken: string;
  cookieName: string;
}

// Interface pour la validation CSRF
export interface CsrfValidationResult {
  isValid: boolean;
  error?: string;
}

// Types pour les headers CSRF
export interface CsrfHeaders {
  'X-CSRF-Token'?: string;
  'X-Requested-With'?: string;
}

// Interface pour les options de middleware CSRF
export interface CsrfMiddlewareOptions {
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  skipIf?: (request: any) => boolean;
}
