import { fastify } from "../config/fastifyConfig.js";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/post.js";
import { getPostsSchema, createPostSchema, updatePostSchema, deletePostSchema } from "../dtos/PostsDtos.js";

fastify.get("/posts", { schema: getPostsSchema }, getPosts);
fastify.post("/posts", { schema: createPostSchema }, createPost);
fastify.put("/posts/:id", { schema: updatePostSchema }, updatePost);
fastify.delete("/posts/:id", { schema: deletePostSchema }, deletePost);
