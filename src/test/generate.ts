import { userType } from 'core/redux/spotify';
import faker from '@faker-js/faker';
import { randomInt } from 'utils/make';

function buildUser(overrides: { [key: string]: any }): userType {
  const product = ['free', 'premium'];
  return {
    country: faker.address.countryCode(),
    display_name: faker.internet.userName(),
    email: faker.internet.email(),
    href: faker.internet.url(),
    id: faker.datatype.uuid(),
    images: [
      {
        height: null,
        url: faker.internet.avatar(),
        width: null,
      },
    ],
    product: product[randomInt(2)],
    type: 'user',
    uri: `spotify:user:${faker.datatype.uuid()}`,
    ...overrides,
  };
}

export { buildUser };
