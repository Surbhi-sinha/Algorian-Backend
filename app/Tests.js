function* generatorFunction(){
      yield(1);
      yield(2);
      yield(3);
}

const generatorFunc  = generatorFunction()


console.log(generatorFunc.next());
console.log(generatorFunc.next());
console.log(generatorFunc.next());

