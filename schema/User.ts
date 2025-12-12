import {list} from '@keystone-6/core';
import {text, password, relationship } from '@keystone-6/core/fields';

const isAdmin = ({ session }: any) => Boolean(session?.data?.isAdmin);
const isSignedIn = ({ session }: any) => Boolean(session?.data);

export const User = list({
    access:{
    operation:{
      create: ()=>true,
      update: isSignedIn,
      delete: isAdmin,
      query: ()=>true
    },
    },
    fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
        password: password({ validation: { isRequired: true } }),
        posts: relationship({ ref: 'Post.author', many: true }),
        role: relationship({ ref: 'Role.users' })
    },
});
