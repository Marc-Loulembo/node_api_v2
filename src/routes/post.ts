import { fastify } from "../config/fastifyConfig.js";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/post.js";
import { getPostsSchema, createPostSchema, updatePostSchema, deletePostSchema } from "../dtos/PostsDtos.js";
import { authenticateToken } from "../middleware/auth.js";

fastify.get("/posts", { schema: getPostsSchema }, getPosts);
fastify.post("/posts", { preHandler: authenticateToken, schema: createPostSchema }, createPost);
fastify.put("/posts/:id", { preHandler: authenticateToken, schema: updatePostSchema }, updatePost);
fastify.delete("/posts/:id", { preHandler: authenticateToken, schema: deletePostSchema }, deletePost);
