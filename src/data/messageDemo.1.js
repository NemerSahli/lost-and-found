let message = {
  _id: '54545',
  content: '1st message',
  from: 'Nemer',
  to: 'Ribo',
  item: 'computer',
  date: '02.02.2019 4:17',
  port: '2001'
};

let message2 = {
  _id: '54545',
  content: '2st message',
  from: 'Ribo',
  to: 'Nemer',
  item: 'computer',
  date: '02.02.2019 4:23',
  port: '2001'
};

let message3 = {
  _id: '54545',
  content: '3st message',
  from: 'Nemer',
  to: 'Ribo',
  item: 'computer',
  date: '02.02.2019 5:44',
  port: '2001'
};

{
  $or: [
    { $and: [{ from: 'Nemer' }, { to: 'Ribo' }, { item: 'computer' }] },
    { $and: [{ from: 'Ribo' }, { to: 'Nemer' }, { item: 'computer' }] }
  ];
}
