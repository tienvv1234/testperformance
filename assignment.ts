export class MyArray {

    private collection: Array<typeOfTheArray> = [];
  
    public identity<T>(arg: T): T {
      return arg;
    }

    public add<typeOfTheArray>(value: typeOfTheArray): void {
      if (!value || (typeof value !== 'string' && typeof value !== 'number')) {
        throw new Error('Your argument must be string or number');
      }
  
      if (this.collection.length) {
        const valueType = typeof this.collection[0];
        if (typeof value !== valueType) {
          throw new Error(`Your argument must be ${valueType}`);
        } else {
          
        }
      } else {
        this.collection.push(value);
      }
    }
  
    public remove(value: string | number): void {
      this.collection = this.collection.filter((item) => item !== value);
    }
  
    public getvalues(): (string | number)[] {
      return this.collection;
    }
}

function filterArrayTypesafe<T>(arrayToFilter: Array<T>): Array<T> {
    let eventNums = [];

    eventNums.push(arrayToFilter);

    return eventNums;
}

const booleanAry = new MyArray()
booleanAry.add<string | number>(true)
booleanAry.add<string | number>(false)
const typeMixedAry = new MyArray();
typeMixedAry.add<string | number>(1);
typeMixedAry.add<string | number>('bbb');
