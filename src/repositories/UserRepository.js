import { User } from '../models/User.js';

export class UserRepository {
  static async findById(id) {
    return await User.findById(id);
  }

  static async findByEmail(email) {
    return await User.findByEmail(email);
  }

  static async create(userData) {
    return await User.create(userData);
  }

  static async update(id, userData) {
    return await User.update(id, userData);
  }

  static async delete(id) {
    return await User.delete(id);
  }

  static async findAll(options = {}) {
    return await User.findAll(options);
  }

  static async validateUserData(userData) {
    const errors = [];

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
