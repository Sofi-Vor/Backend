import{ list} from '@keystone-6/core';
import { allowAll } from "@keystone-6/core/access";
import{ text, relationship} from '@keystone-6/core/fields'

const hasRole = ({ session, roleName }: { session?: any; roleName: string }) => {
  return session?.data?.role?.name === roleName;
};

export const Tag = list({
    access: {
      operation: {
        create: ({ session }) => hasRole({ session, roleName: 'Admin' }),
        query: () => true,
        update: ({ session }) => hasRole({ session, roleName: 'Admin' }),
        delete: ({ session }) => hasRole({ session, roleName: 'Admin' }),
      },
    },
    fields:{
        name: text({validation: {isRequired: true}}),
        posts: relationship({ ref: 'Post.tags', many: true })
    }

});