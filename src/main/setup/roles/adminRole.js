export default {
  // define the role name as object key
  admin: [
    // user model permissions
    'user:findAll',
    'user:count',
    'user:create',
    'user:update',
    'user:delete',
    'user:findOne',
    'user:findById',
    'user:roles:findAll',
    'user:roles:count',
    'user:roles:add',
    'user:roles:addMultiple',

    // sesion model permissions
    'session:findAll',
    'session:count',
    'session:create',
    'session:delete',
    'session:findOne',
    'session:findById',
    'session:user:findOne',
  ],
};