let message = {
  _id: '54545',
  content: '1st message',
  from: 'Nemer',
  to: 'Hamid',
  item: 'computer',
  date: '02.02.2019 9:17',
  port: '2003'
};

let message2 = {
  _id: '54545',
  content: '2st message',
  from: 'Hamid',
  to: 'Nemer',
  item: 'computer',
  date: '02.02.2019 10:19',
  port: '2003'
};

let message3 = {
  _id: '54545',
  content: '3st message',
  from: 'Nemer',
  to: 'Hamid',
  item: 'computer',
  date: '02.02.2019 11:10',
  port: '2003'
};

{
  $or: [
    { $and: [{ from: 'Nemer' }, { to: 'Hamid' }, { item: 'computer' }] },
    { $and: [{ from: 'Hamid' }, { to: 'Nemer' }, { item: 'computer' }] }
  ];
}
