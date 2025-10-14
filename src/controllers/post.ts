import { PostRepository } from "../repositories/PostRepository.js";
import { FastifyRequest, FastifyReply } from 'fastify';
import { PostFindOptions, PostCreateData, PostUpdateData } from '../models/Post.js';

export interface PostQueryParams {
  page?: string;
  limit?: string;
}

export interface PostRequestBody {
  id?: string | number;
  title?: string;
  content?: string;
  authorId?: string | number;
}

export interface PostResponse {
  message?: string;
  error?: string;
  details?: string[];
}

export interface ErrorResponse {
  error: string;
  details?: string[];
}

export const getPosts = async (request: FastifyRequest<{ Querystring: PostQueryParams }>, reply: FastifyReply): Promise<any> => {
  try {
    const { page = '1', limit = '10' } = request.query;
    const options: PostFindOptions = {
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

export const createPost = async (request: FastifyRequest<{ Body: PostRequestBody }>, reply: FastifyReply): Promise<any> => {
  try {
    const postData = request.body;

    // Validation des données
    const validation = await PostRepository.validatePostData(postData);
    if (!validation.isValid) {
      return reply.status(400).send({
        error: 'Données invalides',
        details: validation.errors
      });
    }

    const post = await PostRepository.create(postData as PostCreateData);
    return post;
  } catch (error) {
    console.error('Erreur dans createPost:', error);
    reply.status(500).send({
      error: 'Erreur lors de la création du post'
    });
  }
};

export const updatePost = async (request: FastifyRequest<{ Body: PostRequestBody }>, reply: FastifyReply): Promise<any> => {
  try {
    const { id, ...postData } = request.body;

    if (!id) {
      return reply.status(400).send({
        error: 'ID du post requis'
      });
    }

    // Validation des données (sans authorId pour la mise à jour)
    const validation = await PostRepository.validatePostData({ ...postData, authorId: 1 }); // ID temporaire pour validation
    if (!validation.isValid) {
      return reply.status(400).send({
        error: 'Données invalides',
        details: validation.errors
      });
    }

    const post = await PostRepository.update(id, postData as PostUpdateData);
    return post;
  } catch (error) {
    console.error('Erreur dans updatePost:', error);
    reply.status(500).send({
      error: 'Erreur lors de la mise à jour du post'
    });
  }
};

export const deletePost = async (request: FastifyRequest<{ Body: { id: string | number } }>, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.body;

    if (!id) {
      reply.status(400).send({
        error: 'ID du post requis'
      });
      return;
    }

    await PostRepository.delete(id);
    reply.send({ message: "Post supprimé avec succès" });
  } catch (error) {
    console.error('Erreur dans deletePost:', error);
    reply.status(500).send({
      error: 'Erreur lors de la suppression du post'
    });
  }
};
