  let Users = {
        user1 : {username: 'livia', password: '12345678'},
        user2 : {username: 'leonardo', password: '12345678'},
        user3 : {username: 'simone', password: '12345678'}
  }

  var allUsers = [];
  for(var user in Users) {
      allUsers.push(Users[user]);
  }

//export allUsers;
