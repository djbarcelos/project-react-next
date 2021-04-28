export default function map(array: Array<any>): void[] {
  return array.map((item) => {
    item.id = item._id;
    delete item._id;
    return item;
  });
}
