const db = {
  collection: function() {
    return {
      find: function() {
        return {
          toArray: function() {
            return [
              {
                _id: 'asasdfasfasdf',
                no: 1,
                totalPrice: 129000
              }
            ];
          }
        };
      }
    };
  }
};

module.exports = db;
