import { config } from '@keystone-6/core';
import { User } from './schema/User';
import { Tag } from './schema/Tag';
import { Category } from './schema/Category';
import { Post } from './schema/Post';
import { Role } from './schema/Role';
import { Comment } from './schema/Comment';
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: "postgres://postgres:root@localhost:5432/keystone_blog"
    },

    lists: {
      User,
      Role,
      Post,
      Tag,
      Category,
      Comment
    },

    server: {
      port: 3001,
      // КРИТИЧНО ВАЖНО: добавляем CORS
      cors: {
        origin: ['http://localhost:3000'], // Ваш Next.js на порту 3000
        credentials: true, // Разрешаем куки
      },
      // Дополнительные настройки для кук
      extendExpressApp: (app) => {
        // Убедимся, что куки устанавливаются правильно
        app.use((req, res, next) => {
          res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
          res.header('Access-Control-Allow-Credentials', 'true');
          next();
        });
      }
    },
    
     storage: {
      my_images: {
        kind: 'local',
        type: 'image',
        storagePath: 'public/images',
        generateUrl: path => `/images${path}`,
        serverRoute: {
          path: '/images'
        },
        preserve: false,
      },
    },
    session,

    ui: {
      isAccessAllowed: (context) => {
    if (!context.session) return false;
    if (!context.session.data?.id) return false;
    return true;
  },
  },
    
  })
);