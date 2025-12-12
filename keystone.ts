import { config } from '@keystone-6/core';
import { User } from './schema/User';
import { Tag } from './schema/Tag';
import { Category } from './schema/Category';
import { Post } from './schema/Post';
import { Role } from './schema/Role';
import { withAuth, session } from './auth';


export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: "postgres://postgres:root@localhost:5432/keystone_blog",
    },

    lists: {
      User,
      Role,
      Post,
      Tag,
      Category,
    },

    server:{
      port: 3001
    },
    storage: {
    myLocalImages: {
      kind: 'local',
      type: 'image',
      storagePath: 'public/images',
      generateUrl: (path: string) => `/images/${path}`,
      serverRoute: {
        path: '/images',
      },
      preserve: false,
    },
    },

    session,

    ui: {
      isAccessAllowed: (context) => {
        const role = context?.session?.data?.role?.name;
        return role === 'admin';
      },
    },

    
  })
);