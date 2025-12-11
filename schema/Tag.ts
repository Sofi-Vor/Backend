import{ list} from '@keystone-6/core';
import { allowAll } from "@keystone-6/core/access";
import{ text, relationship} from '@keystone-6/core/fields'

const isAdmin = ({ session }: any) => Boolean(session?.data?.isAdmin);

export const Tag = list({
    access: {
      operation: {
        create: isAdmin,
        query: () => true,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    fields:{
        name: text({validation: {isRequired: true}}),
        posts: relationship({ ref: 'Post.tags', many: true })
    }

});