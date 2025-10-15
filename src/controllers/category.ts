import { FastifyRequest, FastifyReply } from 'fastify';
import { CategoryRepository } from "../repositories/CategoryRepository.js";
import {
  CategoryQueryParams,
  CategoryRequestBody,
  CategoryResponse,
  ErrorResponse,
  CategoryController,
  CategoryFindOptions,
  CategoryCreateData,
  CategoryUpdateData
} from '../types/index.js';

export const getCategories = async (request: FastifyRequest<{ Querystring: CategoryQueryParams }>, reply: FastifyReply): Promise<any> => {
  try {
    const { page = '1', limit = '10' } = request.query;
    const options: CategoryFindOptions = {
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const result = await CategoryRepository.findAll(options);
    return result;
  } catch (error) {
    console.error('Erreur dans getCategories:', error);
    reply.status(500).send({
      error: 'Erreur lors de la récupération des catégories'
    });
  }
};

export const getCategory = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<any> => {
  try {
    const { id } = request.params;

    if (!id || isNaN(parseInt(id))) {
      return reply.status(400).send({
        error: 'ID de catégorie invalide'
      });
    }

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return reply.status(404).send({
        error: 'Catégorie non trouvée'
      });
    }

    return category;
  } catch (error) {
    console.error('Erreur dans getCategory:', error);
    reply.status(500).send({
      error: 'Erreur lors de la récupération de la catégorie'
    });
  }
};

export const createCategory = async (request: FastifyRequest<{ Body: CategoryRequestBody }>, reply: FastifyReply): Promise<any> => {
  try {
    const categoryData = request.body;

    // Validation des données
    const validation = await CategoryRepository.validateCategoryData(categoryData);
    if (!validation.isValid) {
      return reply.status(400).send({
        error: 'Données invalides',
        details: validation.errors
      });
    }

    // Vérifier si la catégorie existe déjà
    const categoryExists = await CategoryRepository.checkCategoryExists(categoryData.name!);
    if (categoryExists) {
      return reply.status(409).send({
        error: 'Une catégorie avec ce nom existe déjà'
      });
    }

    const category = await CategoryRepository.create(categoryData as CategoryCreateData);
    return reply.status(201).send(category);
  } catch (error) {
    console.error('Erreur dans createCategory:', error);
    reply.status(500).send({
      error: 'Erreur lors de la création de la catégorie'
    });
  }
};

export const updateCategory = async (request: FastifyRequest<{ Params: { id: string }, Body: CategoryRequestBody }>, reply: FastifyReply): Promise<any> => {
  try {
    const { id } = request.params;
    const categoryData = request.body;

    if (!id || isNaN(parseInt(id))) {
      return reply.status(400).send({
        error: 'ID de catégorie invalide'
      });
    }

    // Vérifier si la catégorie existe
    const existingCategory = await CategoryRepository.findById(id);
    if (!existingCategory) {
      return reply.status(404).send({
        error: 'Catégorie non trouvée'
      });
    }

    // Validation des données
    const validation = await CategoryRepository.validateCategoryData(categoryData);
    if (!validation.isValid) {
      return reply.status(400).send({
        error: 'Données invalides',
        details: validation.errors
      });
    }

    // Vérifier si le nouveau nom existe déjà (si le nom est modifié)
    if (categoryData.name && categoryData.name !== existingCategory.name) {
      const categoryExists = await CategoryRepository.checkCategoryExists(categoryData.name, parseInt(id));
      if (categoryExists) {
        return reply.status(409).send({
          error: 'Une catégorie avec ce nom existe déjà'
        });
      }
    }

    const category = await CategoryRepository.update(id, categoryData as CategoryUpdateData);
    return category;
  } catch (error) {
    console.error('Erreur dans updateCategory:', error);
    reply.status(500).send({
      error: 'Erreur lors de la mise à jour de la catégorie'
    });
  }
};

export const deleteCategory = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params;

    if (!id || isNaN(parseInt(id))) {
      reply.status(400).send({
        error: 'ID de catégorie invalide'
      });
      return;
    }

    // Vérifier si la catégorie existe
    const existingCategory = await CategoryRepository.findById(id);
    if (!existingCategory) {
      reply.status(404).send({
        error: 'Catégorie non trouvée'
      });
      return;
    }

    await CategoryRepository.delete(id);
    reply.send({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error('Erreur dans deleteCategory:', error);
    reply.status(500).send({
      error: 'Erreur lors de la suppression de la catégorie'
    });
  }
};

export const getCategoryPosts = async (request: FastifyRequest<{ Params: { id: string }, Querystring: CategoryQueryParams }>, reply: FastifyReply): Promise<any> => {
  try {
    const { id } = request.params;
    const { page = '1', limit = '10' } = request.query;

    if (!id || isNaN(parseInt(id))) {
      return reply.status(400).send({
        error: 'ID de catégorie invalide'
      });
    }

    const options: CategoryFindOptions = {
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const category = await CategoryRepository.getPostsByCategory(id, options);

    if (!category) {
      return reply.status(404).send({
        error: 'Catégorie non trouvée'
      });
    }

    return category;
  } catch (error) {
    console.error('Erreur dans getCategoryPosts:', error);
    reply.status(500).send({
      error: 'Erreur lors de la récupération des posts de la catégorie'
    });
  }
};
