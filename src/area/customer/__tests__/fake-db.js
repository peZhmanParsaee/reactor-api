const customers = [
  {
    _id: 'asasdfasfasdf',
    fullName: 'Pezhman Parsaee'
  },
  {
    _id: '5eb687dc1a9b7218304e2ecb',
    fullName: 'Bjarne Stroustrup'
  },
  {
    id: '5eb687dc1a9b7218304effff',
    fullName: 'Douglas Crockford'
  }
];

const db = {
  collection: () => ({
    find: query => {
      let result;

      if (query) {
        result = customers.filter(x => x.fullName.match(query.fullName.$regex));
      } else {
        result = customers;
      }

      return { toArray: () => result };
    }
  })
};

module.exports = db;
