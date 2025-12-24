import {list} from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {text, password, relationship } from '@keystone-6/core/fields';

const hasAnyRole = ({ session, allowedRoles }: { session?: any; allowedRoles: string[] }) => {
  return allowedRoles.includes(session?.data?.role?.name);
};

export const User = list({
    access:{
    operation:{
      create: allowAll,
      update: ({ session }) => hasAnyRole({ session, allowedRoles: ['Admin', 'User'] }),
      delete: ({ session }) => hasAnyRole({ session, allowedRoles: ['Admin'] }),
      query: ()=>true
    },
    },
    fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
        password: password({ validation: { isRequired: true },
        isFilterable: false,
      isOrderable: false,}),
        posts: relationship({ ref: 'Post.author', many: true }),
        role: relationship({ ref: 'Role.users', many: false, }),
        comments: relationship({ref: 'Comment.author',many: true,}),
    },
});
