axios.get('http://localhost:8000/events', {
  auth: {
    username: 'tgrund',
    password: '***'
  }
})
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });