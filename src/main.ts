export function shallowEquals<T>(list1: T[], list2: T[]): boolean {
  validateOrThrow(list1);
  validateOrThrow(list2);

  if (haveDifferentSize(list1, list2)) {
    return false;
  }
  if (isEmpty(list1)) {
    return true;
  }

  const [head1, ...tail1] = list1;
  const [head2, ...tail2] = list2;

  return (head1 === head2) && shallowEquals(tail1, tail2);
}

function validateOrThrow<T>(list: T[]): void {
    if (!Array.isArray(list)) {
        throw new TypeError('list should be an instance of Array');
    }
}

function haveDifferentSize<T>(list1: T[], list2: T[]): boolean {
    return list1.length !== list2.length
}

function isEmpty<T>(list: T[]): boolean {
  return list.length === 0;
}

export function map<T, U>(
  list: T[],
  mapCallback: (item: T) => U
): U[] {
  validateOrThrow(list);
    
  if (isEmpty(list)) {
    return [];
  }

  const [head, ...tail] = list;

  return [mapCallback(head), ...map(tail, mapCallback)];
}

export function reduce<T, U>(
  list: T[],
  reduceCallback: (item: T, reducedValue: U) => U,
  initialValue: U
): U {
  validateOrThrow(list);
    
  if (isEmpty(list)) {
    return initialValue;
  }

  const [head, ...tail] = list;

  return reduce(tail, reduceCallback, reduceCallback(head, initialValue));
}

export function filter<T>(
  list: T[],
  predicate: (item: T) => boolean
): T[] {
  validateOrThrow(list);

  if (isEmpty(list)) {
    return [];
  }

  const [head, ...tail] = list;

  const isHeadAccepted = predicate(head);
  const filteredTail = filter(tail, predicate);

  return isHeadAccepted ? [head, ...filteredTail] : filteredTail;
}

export function createMapReduceEngine<T, U, R>(
  mapCallback: (T) => U,
  reduceCallback: (U, R) => R,
  initialValue: R
) {
  return (list: T[]): R => {
    const mappedList = map(list, mapCallback);
    const reducedValue = reduce(mappedList, reduceCallback, initialValue);

    return reducedValue;
  };
}
