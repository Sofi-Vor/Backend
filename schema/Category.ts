import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { createSlug } from './Slug';

const hasRole = ({ session, roleName }: { session?: any; roleName: string }) => {
  return session?.data?.role?.name === roleName;
};

export const Category = list({
  access: {
      operation: {
        create: ({ session }) => hasRole({ session, roleName: 'Admin' }),
        query: () => true,
        update: ({ session }) => hasRole({ session, roleName: 'Admin' }),
        delete: ({ session }) => hasRole({ session, roleName: 'Admin' }),
      },
    },
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: 'unique' }),
    posts: relationship({ ref: 'Post.category', many: true })
  },

  hooks: {
  resolveInput: async ({ resolvedData, context, operation }) => {
    if (
      operation === 'create' &&
      resolvedData.name &&
      !resolvedData.slug
    ) {
      resolvedData.slug = await createSlug(
        resolvedData.name,
        context
      );
    }

    return resolvedData;
  },}
});