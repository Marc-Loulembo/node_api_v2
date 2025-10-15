// Schémas JSON pour les Catégories

/**
 * Schéma pour créer une nouvelle catégorie
 */
export const createCategorySchema = {
  tags: ['categories'],
  description: 'Créer une nouvelle catégorie',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        description: 'Nom de la catégorie'
      },
      description: {
        type: 'string',
        maxLength: 500,
        description: 'Description de la catégorie'
      }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

/**
 * Schéma pour mettre à jour une catégorie
 */
export const updateCategorySchema = {
  tags: ['categories'],
  description: 'Mettre à jour une catégorie existante',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 100
      },
      description: {
        type: 'string',
        maxLength: 500
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

/**
 * Schéma pour récupérer une catégorie
 */
export const getCategorySchema = {
  tags: ['categories'],
  description: 'Récupérer une catégorie par son ID',
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string' },
        posts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' }
            }
          }
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

/**
 * Schéma pour la liste des catégories
 */
export const getCategoriesSchema = {
  tags: ['categories'],
  description: 'Récupérer la liste des catégories avec pagination',
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number', minimum: 1, default: 1 },
      limit: { type: 'number', minimum: 1, maximum: 100, default: 10 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: 'string' },
              posts: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' }
                  }
                }
              },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  }
};

/**
 * Schéma pour supprimer une catégorie
 */
export const deleteCategorySchema = {
  tags: ['categories'],
  description: 'Supprimer une catégorie',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};

/**
 * Schéma pour récupérer les posts d'une catégorie
 */
export const getCategoryPostsSchema = {
  tags: ['categories'],
  description: 'Récupérer les posts d\'une catégorie',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number', minimum: 1, default: 1 },
      limit: { type: 'number', minimum: 1, maximum: 100, default: 10 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string' },
        posts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              content: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              authors: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  email: { type: 'string' }
                }
              }
            }
          }
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

