const dbContext = require('./db-context');
const { COLLECTIONS } = require("../infrastructures/models/enums.json");
const provincesData = require('./ir-provinces.json');
const customersData = [
  { fullName: 'پژمان پارسایی' },
  { fullName: 'درخشان فر' },
  { fullName: 'جف بیزوس' },
  { fullName: 'بیل گیتس' },
  { fullName: 'بیارنه استروستوپ' },
];

dbContext.connect()
  .then(db => {
    
    for (const province of provincesData) {

      db.collection(COLLECTIONS.PROVINCES)
        .insertOne({
          name: province.name
        })
        .then(insertProvinceResult => {
          const provinceId = insertProvinceResult.insertedId;

          const provinceCities = province.cities.map(function(city) {
            return {
              provinceId: provinceId,
              name: city.name          
            }
          });

          db.collection(COLLECTIONS.CITIES).insertMany(provinceCities);

        });
    }

    db.collection(COLLECTIONS.CUSTOMERS)
      .insertMany(customersData);
    
    db.collection(COLLECTIONS.LAST_INVOICE_NO)
      .insertOne({
        invoiceNo: 1
      });
    
    db.createCollection(COLLECTIONS.INVOICES, (err, res) => {
      if (err) throw err;
      console.log("the invoices collection was created");      
    });
    

  });