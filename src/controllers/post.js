import { PostRepository } from "../repositories/PostRepository.js";

export const getPosts = async (request, reply) => {
  try {
    const { page = 1, limit = 10 } = request.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const result = await PostRepository.findAll(options);
    return result;
  } catch (error) {
    console.error('Erreur dans getPosts:', error);
    reply.status(500).send({
      error: 'Erreur lors de la récupération des posts'
    });
  }
};

export const createPost = async (request, reply) => {
  try {
    const postData = request.body;

    // Validation des données
    const validation = PostRepository.validatePostData(postData);
    if (!validation.isValid) {
      return reply.status(400).send({
        error: 'Données invalides',
        details: validation.errors
      });
    }

    const post = await PostRepository.create(postData);
    return post;
  } catch (error) {
    console.error('Erreur dans createPost:', error);
    reply.status(500).send({
      error: 'Erreur lors de la création du post'
    });
  }
};

export const updatePost = async (request, reply) => {
  try {
    const { id, ...postData } = request.body;

    if (!id) {
      return reply.status(400).send({
        error: 'ID du post requis'
      });
    }

    // Validation des données
    const validation = PostRepository.validatePostData({ ...postData, authorId: 1 }); // ID temporaire pour validation
    if (!validation.isValid) {
      return reply.status(400).send({
        error: 'Données invalides',
        details: validation.errors
      });
    }

    const post = await PostRepository.update(id, postData);
    return post;
  } catch (error) {
    console.error('Erreur dans updatePost:', error);
    reply.status(500).send({
      error: 'Erreur lors de la mise à jour du post'
    });
  }
};

export const deletePost = async (request, reply) => {
  try {
    const { id } = request.body;

    if (!id) {
      return reply.status(400).send({
        error: 'ID du post requis'
      });
    }

    await PostRepository.delete(id);
    return { message: "Post supprimé avec succès" };
  } catch (error) {
    console.error('Erreur dans deletePost:', error);
    reply.status(500).send({
      error: 'Erreur lors de la suppression du post'
    });
  }
};
