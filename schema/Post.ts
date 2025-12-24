import { list } from '@keystone-6/core';
import { text, relationship, select, timestamp, image } from '@keystone-6/core/fields';
import { createSlug } from './Slug';

const hasAnyRole = ({ session, allowedRoles }: { session?: any; allowedRoles: string[] }) => {
  return allowedRoles.includes(session?.data?.role?.name);
};

export const Post = list({
  access:{
    operation:{
      create: ({ session }) => hasAnyRole({ session, allowedRoles: ['Admin', 'User'] }),
      update: ({ session }) => hasAnyRole({ session, allowedRoles: ['Admin', 'User'] }),
      delete: ({ session }) => hasAnyRole({ session, allowedRoles: ['Admin'] }),
      query: ()=>true
    },
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: 'unique' }),
    image: image({ storage: 'my_images' }),
    content: text({ ui: { displayMode: 'textarea' } }),
    excerpt: text({ validation: { isRequired: false } }),
    status: select({
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' }
      ],
      defaultValue: 'draft',
      validation: { isRequired: true },
      ui: { displayMode: 'segmented-control' },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: { itemView: { fieldMode: 'read' } },
    }),

    updatedAt: timestamp({
      db: { updatedAt: true },
      ui: { itemView: { fieldMode: 'read' } },
    }),

    author: relationship({ ref: 'User.posts' }),
    category: relationship({ ref: 'Category.posts' }),
    tags: relationship({ ref: 'Tag.posts', many: true }),
    comments : relationship({ref: 'Comment.post', many: true})
  },

  ui: {
  listView: {
    initialColumns: ['title', 'status'],
  },
  searchFields: ['title', 'excerpt'],
  },

  hooks: {
  resolveInput: async ({ resolvedData, context, operation }) => {
    if (
      operation === 'create' &&
      resolvedData.title &&
      !resolvedData.slug
    ) {
      resolvedData.slug = await createSlug(
        resolvedData.title,
        context
      );
    }

    return resolvedData;
  },
}


});
