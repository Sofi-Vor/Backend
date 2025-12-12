import { list } from '@keystone-6/core';
import { text, relationship, select, timestamp, image } from '@keystone-6/core/fields';
import { createSlug } from './Slug';
import { allowAll } from '@keystone-6/core/access';
import { timeStamp } from 'console';


const isAdmin = ({ session }: any) => Boolean(session?.data?.isAdmin);
const isSignedIn = ({ session }: any) => Boolean(session?.data);


export const Post = list({
  access:{
    operation:{
      create: allowAll,
      update: allowAll,
      delete: allowAll,
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
    image: image({storage: 'myLocalImages'}),
    content: text({ ui: { displayMode: 'textarea' } }),
    excerpt: text({ validation: { isRequired: false } }),
    status: select({
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' }
      ],
      defaultValue: 'draft'
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
    tags: relationship({ ref: 'Tag.posts', many: true })
  },


  hooks: {
    resolveInput: async ({ resolvedData, operation, item }) => {
      if (resolvedData.title && (!resolvedData.slug || resolvedData.slug === "")) {
        resolvedData.slug = createSlug(resolvedData.title);
      }
      return resolvedData;
    }
  }
});
