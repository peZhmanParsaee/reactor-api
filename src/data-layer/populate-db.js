const dbConnection = require('./mongodb-singleton-connection');
const { COLLECTIONS } = require('../infrastructures/models/enums.json');
const provincesData = require('./ir-provinces.json');
const customersData = [
  { fullName: 'پژمان پارسایی' },
  { fullName: 'درخشان فر' },
  { fullName: 'جف بیزوس' },
  { fullName: 'بیل گیتس' },
  { fullName: 'بیارنه استروستوپ' },
];

dbConnection.getInstance()
  .then(async (dbInstance) => {
    const db = dbConnection.getDb();
    
    for (const province of provincesData) {

      await db.collection(COLLECTIONS.PROVINCES)
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

          await db.collection(COLLECTIONS.CITIES).insertMany(provinceCities);

        });
    }

    await db.collection(COLLECTIONS.CUSTOMERS)
      .insertMany(customersData);
    
    await db.collection(COLLECTIONS.LAST_INVOICE_NO)
      .insertOne({
        invoiceNo: 1
      });
    
    await db.createCollection(COLLECTIONS.INVOICES);    

    await dbInstance.close();

    console.log('Data was imported successfully');
  })
  .catch(err => {
    console.error(err);
  });
