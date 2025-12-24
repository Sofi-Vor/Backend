import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship, timestamp } from '@keystone-6/core/fields';

const hasAnyRole = ({ session, allowedRoles }: { session?: any; allowedRoles: string[] }) => {
  return allowedRoles.includes(session?.data?.role?.name);
};

export const Comment = list({
  access: {
    operation: {
      query: allowAll,
      create: ({ session }) => hasAnyRole({ session, allowedRoles: ['Admin', 'User'] }),
      update: ({ session }) => hasAnyRole({ session, allowedRoles: ['Admin'] }),
      delete: ({ session }) => hasAnyRole({ session, allowedRoles: ['Admin'] }),
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
