
import { config } from '@keystone-6/core';
import { User } from './schema/User';
import { Tag } from './schema/Tag';
import { Category } from './schema/Category';
import { Post } from './schema/Post';


export default config({
  db: {
    provider: 'postgresql',
    url:"postgres://postgres:root@localhost:5432/keystone_blog",
  },
  lists:{
    User,
    Tag,
    Category, 
    Post
  },
 storage: {
    myLocalImages: {
      kind: 'local',
      type: 'image',
      storagePath: 'public/images',
      generateUrl: (path: string) => `/images${path}`,
      serverRoute: {
        path: '/images',
      },
      preserve: false,
    },
  },
   ui: {
    isDisabled: false,
  },
  session: undefined,
});