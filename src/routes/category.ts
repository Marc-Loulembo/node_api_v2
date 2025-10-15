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

fastify.get("/categories", { schema: getCategoriesSchema }, getCategories);
fastify.get("/categories/:id", { schema: getCategorySchema }, getCategory);
fastify.post("/categories", { schema: createCategorySchema }, createCategory);
fastify.put("/categories/:id", { schema: updateCategorySchema }, updateCategory);
fastify.delete("/categories/:id", { schema: deleteCategorySchema }, deleteCategory);
fastify.get("/categories/:id/posts", { schema: getCategoryPostsSchema }, getCategoryPosts);
