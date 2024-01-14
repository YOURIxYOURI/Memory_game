const faker = require('faker');

const generateData = () => {
  const users = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    Login: faker.internet.userName(),
    Password: faker.random.alphaNumeric(8),
  }));
  
  const generateRandomLogin = (users) => {
    const randomIndex = faker.random.number({ min: 0, max: users.length - 1 });
    return users[randomIndex].Login;
  };
  
  const scores = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    Moves: faker.random.number({ min: 10, max: 50 }),
    Points: faker.random.number({ min: 100, max: 500 }),
    Login: generateRandomLogin(users),
  }));
  console.log(users)
  console.log(score)
  return { users, scores };
};

module.exports = generateData;