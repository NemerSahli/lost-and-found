let message = {
  _id: '54w545',
  content: '1st message',
  from: 'Nemer',
  to: 'Damir',
  item: 'computer',
  date: '02.02.2019 3:17',
  port: '2000'
};

let message2 = {
  _id: '54545r',
  content: '2st message',
  from: 'Damir',
  to: 'Nemer',
  item: 'computer',
  date: '02.02.2019 3:18',
  port: '2000'
};

let message3 = {
  _id: '54545t',
  content: '3st message',
  from: 'Nemer',
  to: 'Damir',
  item: 'computer',
  date: '02.02.2019 3:19',
  port: '2000'
};

{
  $or: [
    { $and: [{ from: 'Nemer' }, { to: 'Damir' }, { item: 'computer' }] },
    { $and: [{ from: 'Damir' }, { to: 'Nemer' }, { item: 'computer' }] }
  ];
}
