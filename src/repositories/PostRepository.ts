import { Post } from '../models/Post.js';
import { Post as PrismaPost } from '@prisma/client';
import {
  PostCreateData,
  PostUpdateData,
  PostFindOptions,
  PostFindAllResult,
  PostWithAuthor,
  PostValidationResult
} from '../types/index.js';

export class PostRepository {
  static async findById(id: string | number): Promise<PostWithAuthor | null> {
    return await Post.findById(id);
  }

  static async create(postData: PostCreateData): Promise<PostWithAuthor> {
    return await Post.create(postData);
  }

  static async update(id: string | number, postData: PostUpdateData): Promise<PostWithAuthor> {
    return await Post.update(id, postData);
  }

  static async delete(id: string | number): Promise<PrismaPost> {
    return await Post.delete(id);
  }

  static async findAll(options: PostFindOptions = {}): Promise<PostFindAllResult> {
    return await Post.findAll(options);
  }

  static async findByAuthor(authorId: string | number, options: PostFindOptions = {}): Promise<PostFindAllResult> {
    return await Post.findByAuthor(authorId, options);
  }

  static async validatePostData(postData: Partial<PostCreateData>): Promise<PostValidationResult> {
    const errors: string[] = [];

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
    } else if (isNaN(parseInt(postData.authorId.toString()))) {
      errors.push('ID auteur invalide');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
