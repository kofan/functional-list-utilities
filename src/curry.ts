export default function curry(func: Function): Function {
  return (function curryFactory(collectedArgs) {
    return function() {
      const newArgs = Array.prototype.slice.call(arguments);
      const allArgs = [...collectedArgs, ...newArgs];

      if (allArgs.length >= func.length) {
        return func.apply(null, allArgs);
      }

      return curryFactory(allArgs)
    };
  })([]);
}
