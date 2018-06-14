const response = {
  data: {
    message: 'message for overall success',
    // some other information that might help in the response
    // depending on the action
  },
  errors: [
    {
      // errorId: 'errorID' perhaps
      message: 'error description',
    },
  ],
};

module.exports = response;
