import { posts } from "../repositories/post.js";

export const getPosts = async (request, reply) => {
  try {
    const { page = 1, limit = 10 } = request.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const paginatedPosts = posts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: posts.length,
        totalPages: Math.ceil(posts.length / limitNum)
      }
    };
  } catch (error) {
    console.error('Erreur dans getPosts:', error);
    reply.status(500).send({
      error: 'Erreur lors de la récupération des posts'
    });
  }
};

export const createPost = async (request, reply) => {
  const post = request.body;
  posts.push(post);
  return post;
};

export const updatePost = async (request, reply) => {
  const post = request.body;
  const index = posts.findIndex(p => p.id === post.id);
  posts[index] = post;
  return post;
};

export const deletePost = async (request, reply) => {
  const post = request.body;
  const index = posts.findIndex(p => p.id === post.id);
  posts.splice(index, 1);
  return { message: "Post deleted" };
};
