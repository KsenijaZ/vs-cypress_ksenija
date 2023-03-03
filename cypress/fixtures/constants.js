import { faker } from '@faker-js/faker';

class Constants {
    randomName = faker.name.fullName();
    randomEmail = faker.internet.email();
    randomTitle = faker.lorem.sentence(2)
    imgUrl = 'cypress/fixtures/logo.webp';

}

export const constants = new Constants()

