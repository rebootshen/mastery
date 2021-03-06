import HttpStatus from 'http-status-codes';
import {
  assert,
} from 'chai';

const setup = require('../../../../../test/helpers/setup');
const mockRoles = require('../../../../../test/helpers/mock-roles');
const mockUsers = require('../../../../../test/helpers/mock-users');

const prefix = conf.get('prefix');

describe(`user associationLinkMultiple LINK ${prefix}user/{pk}/roles/link`, () => {
  before(async function before() {
    await setup();
    await mockRoles.bind(this).apply();
    await mockUsers.bind(this).apply();
  });

  it('works', async function it() {
    const {
      authenticated1,
    } = this.users;
    const {
      adminRole,
      role1,
    } = this.roles;

    const thisTestUrl = `${prefix}user/${authenticated1.id}/roles/link`;

    const {
      result,
      statusCode,
    } = await server.inject({
      url: thisTestUrl,
      method: 'LINK',
      payload: [
        adminRole.id,
        role1.id,
      ],
      credentials: {
        scope: ['user:findById', 'user:roles:linkMultiple'],
      },
    });

    assert.equal(statusCode, HttpStatus.OK);
    assert.equal(result[0].roleId, adminRole.id);
    assert.equal(result[0].userId, authenticated1.id);
    assert.equal(result[1].roleId, role1.id);
    assert.equal(result[1].userId, authenticated1.id);
  });
});
