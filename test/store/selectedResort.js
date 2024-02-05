class SelectedResort {
  _resortName;
  _tripDuration = {
    checkInDate: "",
    checkOutDate: "",
  };
  _resortPrice = {
    totalAmount: 0,
    taxAmount: 0,
  };

  set tripDuration({ checkInDate, checkOutDate }) {
    this._tripDuration = {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };
  }

  get tripDuration() {
    return this._tripDuration;
  }

  set resortPrice({ totalAmount, taxAmount }) {
    this._resortName = {
      totalAmount: totalAmount,
      taxAmount: taxAmount,
    };
  }

  get resortPrice() {
    return this._resortPrice;
  }

  set resortName(name) {
    this._resortName = name;
  }

  get resortName() {
    return this._resortName;
  }
}

export default new SelectedResort();
