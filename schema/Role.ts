import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const Role = list({
  access: allowAll,

  fields: {
    name: text({ validation: { isRequired: true } }),
    users: relationship({ ref: 'User.role', many: true }),
  },
});