import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship, timestamp } from '@keystone-6/core/fields';

const isAdmin = ({ session }: any) => Boolean(session?.data?.isAdmin);
const isSignedIn = ({ session }: any) => Boolean(session?.data);

export const Comment = list({
  access: {
    operation: {
      query: allowAll,
      create: isSignedIn,
      update: isAdmin,
      delete: isAdmin,
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
