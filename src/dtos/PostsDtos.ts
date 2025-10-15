// Schémas JSON pour les Posts

/**
 * Schéma pour créer un nouveau post
 */
export const createPostSchema = {
  tags: ['posts'],
  description: 'Créer un nouveau post',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['title', 'content', 'categoryId'],
    properties: {
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 255
      },
      content: {
        type: 'string',
        minLength: 1
      },
      categoryId: {
        type: 'number'
      }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        authorId: { type: 'number' },
        categoryId: { type: 'number' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

/**
 * Schéma pour mettre à jour un post
 */
export const updatePostSchema = {
  tags: ['posts'],
  description: 'Mettre à jour un post existant',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 255
      },
      content: {
        type: 'string',
        minLength: 1
      },
      categoryId: {
        type: 'number'
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        authorId: { type: 'number' },
        categoryId: { type: 'number' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

/**
 * Schéma pour récupérer un post
 */
export const getPostSchema = {
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
        title: { type: 'string' },
        content: { type: 'string' },
        authorId: { type: 'number' },
        authors: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        category: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' }
          }
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

/**
 * Schéma pour la liste des posts
 */
export const getPostsSchema = {
  tags: ['posts'],
  description: 'Récupérer la liste des posts avec pagination',
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number', minimum: 1, default: 1 },
      limit: { type: 'number', minimum: 1, maximum: 100, default: 10 },
      search: { type: 'string' },
      authorId: { type: 'number' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        posts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              content: { type: 'string' },
              authorId: { type: 'number' },
              authors: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  email: { type: 'string' }
                }
              },
              category: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  description: { type: 'string' }
                }
              },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' }
      }
    }
  }
};

/**
 * Schéma pour supprimer un post
 */
export const deletePostSchema = {
  tags: ['posts'],
  description: 'Supprimer un post',
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

