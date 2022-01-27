export default function validate(name, location, date, time, comment) {
  // true means invalid, so conditions got reversed
  return {
    name: name.length === 0,
    location: location.length === 0,
    date: date.length === 0,
    time: time.length === 0,
    comment: comment.length === 0
  };
}
