const dbContext = require('../../data-layer/db-context');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');
const { COLLECTIONS } = require('../../infrastructures/models/enums.json');

class LastInvoiceNoService {
  async getNewInvoiceNo() {
    const db = await dbContext.connect();
    let res = await db.collection(COLLECTIONS.LAST_INVOICE_NO)
      .findOne();
    
    await db.collection(COLLECTIONS.LAST_INVOICE_NO)
      .update({ _id: res._id }, { $set: { invoiceNo: res.invoiceNo + 1 } });
    
    return opStatusGenerator({
      status: true,
      payload: res.invoiceNo + 1
    });
  }  
}

module.exports = LastInvoiceNoService;
