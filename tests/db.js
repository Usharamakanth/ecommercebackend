module.exports.getCustomerSync = function(id) { 
    console.log('Reading a customer from MongoDB...');
    return { id: id, points: 11 };
  }