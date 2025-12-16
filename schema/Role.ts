import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship } from '@keystone-6/core/fields';

const isAdmin = ({ session }: any) => Boolean(session?.data?.isAdmin);

export const Role = list({
  access: allowAll,

  fields: {
    name: text({ validation: { isRequired: true } }),
    users: relationship({ ref: 'User.role', many: true }),
  },
});