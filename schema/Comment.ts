import { list } from '@keystone-6/core';
import { text, relationship, timestamp } from '@keystone-6/core/fields';

export const Comment = list({
  access: {
    operation: {
      query: () => true,
      create: ({ session }) => !!session,
      update: ({ session }) => session?.data.role?.name === 'admin',
      delete: ({ session }) => session?.data.role?.name === 'admin',
    },
  },

  fields: {
    content: text({
      validation: { isRequired: true },
      ui: {
        displayMode: 'textarea',
      },
    }),

    post: relationship({
      ref: 'Post.comments',
      many: false
    }),

    author: relationship({
      ref: 'User.comments',
      many: false
    }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
  },
});
