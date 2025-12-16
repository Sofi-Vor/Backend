import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

let sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 дней

export const session = statelessSessions({
  secret: sessionSecret,
  maxAge: sessionMaxAge,
});

export const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  
  initFirstItem: {
    fields: ['name', 'email', 'password', 'role'],
    itemData: {
      role: {
        create: {
          name: 'admin',
        },
      },
    },
  },

  sessionData: `
    id
    name
    email
    role {
      id
      name
    }
  `,
});
