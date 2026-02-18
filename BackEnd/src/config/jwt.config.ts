export const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET || 'your-super-secret-access-key',
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '30m',
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key',
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
};
