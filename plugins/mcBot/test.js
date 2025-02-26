function* myGenerator() {
    console.log('Start');
    yield 1;  // 暂停并返回 1
    console.log('Resume');
    yield 2;  // 暂停并返回 2
    console.log('End');
  }
  
  const gen = myGenerator();
  console.log(gen.next().value);  // 输出 1
  console.log(gen.next().value);  // 输出 2
  console.log(gen.next().value);  // 输出 undefined