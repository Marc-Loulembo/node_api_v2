import { fastify } from "../config/fastifyConfig.js";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryPosts
} from '../controllers/category.js';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  getCategoriesSchema,
  deleteCategorySchema,
  getCategoryPostsSchema
} from '../dtos/CategoryDtos.js';
import { authenticateToken } from '../middleware/auth.js';

fastify.get("/categories", { schema: getCategoriesSchema }, getCategories);
fastify.get("/categories/:id", { schema: getCategorySchema }, getCategory);
fastify.post("/categories", { preHandler: authenticateToken, schema: createCategorySchema }, createCategory);
fastify.put("/categories/:id", { preHandler: authenticateToken, schema: updateCategorySchema }, updateCategory);
fastify.delete("/categories/:id", { preHandler: authenticateToken, schema: deleteCategorySchema }, deleteCategory);
fastify.get("/categories/:id/posts", { preHandler: authenticateToken, schema: getCategoryPostsSchema }, getCategoryPosts);
