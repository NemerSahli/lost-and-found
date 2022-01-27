let message = {
  _id: '54545',
  content: '1st message',
  from: 'Nemer',
  to: 'Niko',
  item: 'computer',
  date: '02.02.2019 1:17',
  port: '2002'
};

let message2 = {
  _id: '54545',
  content: '2st message',
  from: 'Niko',
  to: 'Nemer',
  item: 'computer',
  date: '02.02.2019 3:24',
  port: '2002'
};

let message3 = {
  _id: '54545',
  content: '3st message',
  from: 'Nemer',
  to: 'Niko',
  item: 'computer',
  date: '02.02.2019 3:55',
  port: '2002'
};

{
  $or: [
    { $and: [{ from: 'Nemer' }, { to: 'Niko' }, { item: 'computer' }] },
    { $and: [{ from: 'Niko' }, { to: 'Nemer' }, { item: 'computer' }] }
  ];
}
