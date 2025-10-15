// Export de tous les types et interfaces
export * from './auth';
export * from './user';
export * from './post';
export * from './category';
export * from './jwt';
export * from './config';
export * from './common';
export * from './csrf';

// Re-export des types Prisma pour faciliter l'utilisation
export type { User, Post } from '@prisma/client';

// Type Category temporaire
export type Category = {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};
