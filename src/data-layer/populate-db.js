const dbContext = require('./db-context');
const { COLLECTIONS } = require('../infrastructures/models/enums.json');
const provincesData = require('./ir-provinces.json');
const customersData = [
  { fullName: 'پژمان پارسایی' },
  { fullName: 'درخشان فر' },
  { fullName: 'جف بیزوس' },
  { fullName: 'بیل گیتس' },
  { fullName: 'بیارنه استروستوپ' },
];

dbContext.connect()
  .then(async client => {
    
    for (const province of provincesData) {

      await client.db.collection(COLLECTIONS.PROVINCES)
        .insertOne({
          name: province.name
        })
        .then(async insertProvinceResult => {
          const provinceId = insertProvinceResult.insertedId;

          const provinceCities = province.cities.map(function(city) {
            return {
              provinceId: provinceId,
              name: city.name          
            };
          });

          await client.db.collection(COLLECTIONS.CITIES).insertMany(provinceCities);

        });
    }

    await client.db.collection(COLLECTIONS.CUSTOMERS)
      .insertMany(customersData);
    
    await client.db.collection(COLLECTIONS.LAST_INVOICE_NO)
      .insertOne({
        invoiceNo: 1
      });
    
    await client.db.createCollection(COLLECTIONS.INVOICES);    

    await client.connection.close();

    console.log('Data was imported successfully');
  })
  .catch(err => {
    console.error(err);
  });
