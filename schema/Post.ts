import { list } from '@keystone-6/core';
import { text, relationship, select, timestamp, image } from '@keystone-6/core/fields';
import { createSlug } from './Slug';


const isAdmin = ({ session }: any) => Boolean(session?.data?.isAdmin);


export const Post = list({
  access:{
    operation:{
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
      query: ()=>true
    },
    filter: {
        query: ({ session }: any) => {
          if (session?.data?.isAdmin) return true;
          return { status: { equals: 'published' } };
        },
      }
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
    resolveInput: async ({ resolvedData }) => {
      if (resolvedData.title && (!resolvedData.slug || resolvedData.slug === "")) {
        resolvedData.slug = createSlug(resolvedData.title);
      }
      return resolvedData;
    }
  }


});
