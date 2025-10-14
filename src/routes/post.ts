import { fastify } from "../config/fastifyConfig.js";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/post.js";

fastify.get("/posts", getPosts);
fastify.post("/posts", createPost);
fastify.put("/posts", updatePost);
fastify.delete("/posts", deletePost);
