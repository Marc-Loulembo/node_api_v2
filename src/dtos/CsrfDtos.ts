// Schémas JSON pour les routes CSRF

/**
 * Schéma pour obtenir un token CSRF
 */
export const getCsrfTokenSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            csrfToken: { type: 'string' },
            cookieName: { type: 'string' }
          }
        },
        message: { type: 'string' }
      }
    },
    500: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: { type: 'string' }
      }
    }
  }
};

/**
 * Schéma pour valider un token CSRF
 */
export const validateCsrfSchema = {
  body: {
    type: 'object',
    properties: {
      csrfToken: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    },
    403: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: { type: 'string' }
      }
    },
    500: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: { type: 'string' }
      }
    }
  }
};

/**
 * Schéma pour une opération protégée par CSRF
 */
export const protectedOperationSchema = {
  headers: {
    type: 'object',
    properties: {
      'x-csrf-token': { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            timestamp: { type: 'string', format: 'date-time' },
            method: { type: 'string' },
            url: { type: 'string' }
          }
        }
      }
    },
    403: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    500: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: { type: 'string' }
      }
    }
  }
};
