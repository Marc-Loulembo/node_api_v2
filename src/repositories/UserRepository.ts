import { User } from '../models/User.js';
import { User as PrismaUser } from '@prisma/client';
import {
  UserCreateData,
  UserUpdateData,
  UserFindOptions,
  UserFindAllResult,
  UserValidationResult
} from '../types/index.js';

export class UserRepository {
  static async findById(id: string | number): Promise<PrismaUser | null> {
    return await User.findById(id);
  }

  static async findByEmail(email: string): Promise<PrismaUser | null> {
    return await User.findByEmail(email);
  }

  static async create(userData: UserCreateData): Promise<PrismaUser> {
    return await User.create(userData);
  }

  static async update(id: string | number, userData: UserUpdateData): Promise<PrismaUser> {
    return await User.update(id, userData);
  }

  static async delete(id: string | number): Promise<PrismaUser> {
    return await User.delete(id);
  }

  static async findAll(options: UserFindOptions = {}): Promise<UserFindAllResult> {
    return await User.findAll(options);
  }

  static async validateUserData(userData: Partial<UserCreateData>): Promise<UserValidationResult> {
    const errors: string[] = [];

    if (!userData.email) {
      errors.push('Email requis');
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.push('Email invalide');
    }

    if (!userData.password) {
      errors.push('Mot de passe requis');
    } else if (userData.password.length < 6) {
      errors.push('Mot de passe trop court (minimum 6 caractères)');
    }

    if (!userData.name) {
      errors.push('Nom requis');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
