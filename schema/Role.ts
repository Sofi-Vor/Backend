import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

const hasRole = ({ session, roleName }: { session?: any; roleName: string }) => {
  return session?.data?.role?.name === roleName;
};

export const Role = list({
  access: {
     operation:{
          create: ({ session }) => hasRole({ session, roleName: 'Admin' }),
          update: ({ session }) => hasRole({ session, roleName: 'Admin' }),
          delete: ({ session }) => hasRole({ session, roleName: 'Admin' }),
          query: ()=>true
        },
  },

  fields: {
    name: text({ validation: { isRequired: true } }),
    users: relationship({ ref: 'User.role', many: true }),
  },
});