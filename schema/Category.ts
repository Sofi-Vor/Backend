import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { createSlug } from './Slug';
import { allowAll } from '@keystone-6/core/access';

const isAdmin = ({ session }: any) => Boolean(session?.data?.isAdmin);

export const Category = list({
  access: {
      operation: {
        create: allowAll,
        query: () => true,
        update: allowAll,
        delete: allowAll,
      },
    },
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: 'unique' }),
    posts: relationship({ ref: 'Post.category', many: true })
  },

  hooks: {
      resolveInput: async ({ resolvedData, operation, item }) => {
        if (resolvedData.name && (!resolvedData.slug || resolvedData.slug === "")) {
          resolvedData.slug = createSlug(resolvedData.name);
        }
        return resolvedData;
      }}
});