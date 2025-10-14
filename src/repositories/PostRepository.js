import { Post } from '../models/Post.js';

export class PostRepository {
  static async findById(id) {
    return await Post.findById(id);
  }

  static async create(postData) {
    return await Post.create(postData);
  }

  static async update(id, postData) {
    return await Post.update(id, postData);
  }

  static async delete(id) {
    return await Post.delete(id);
  }

  static async findAll(options = {}) {
    return await Post.findAll(options);
  }

  static async findByAuthor(authorId, options = {}) {
    return await Post.findByAuthor(authorId, options);
  }

  static async validatePostData(postData) {
    const errors = [];

    if (!postData.title) {
      errors.push('Titre requis');
    } else if (postData.title.length < 3) {
      errors.push('Titre trop court (minimum 3 caractères)');
    }

    if (!postData.content) {
      errors.push('Contenu requis');
    } else if (postData.content.length < 10) {
      errors.push('Contenu trop court (minimum 10 caractères)');
    }

    if (!postData.authorId) {
      errors.push('Auteur requis');
    } else if (isNaN(parseInt(postData.authorId))) {
      errors.push('ID auteur invalide');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
