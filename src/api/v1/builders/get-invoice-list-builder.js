export default (function() {
  let self = {
    fromDate: null,
    toDate: this,
    invoiceType: null,
    offset: 0,
    limit: 10
  };
  let validationErrors = [];

  function setFromDate(fromDate) {
    if (fromDate) {
      self.fromDate = fromDate;
    }

    return this;
  }

  function setToDate(toDate) {
    if (toDate) {
      self.toDate = toDate;
    }

    return this;
  }

  function setInvoiceType(invoiceType) {
    if (invoiceType) {
      self.invoiceType = invoiceType;
    }

    return this;
  }

  function setOffset(offset) {
    if (offset) {
      self.offset = offset;
    }

    return this;
  }

  function setLimit(limit) {
    if (limit) {
      self.limit= limit;
    }

    return this;
  }

  function validate() {
    return validationErrors.length === 0;
  }

  function build() {
    return self;
  }

  return {
    setFromDate,
    setToDate,
    setInvoiceType,
    setOffset,
    setLimit
  };
})();
