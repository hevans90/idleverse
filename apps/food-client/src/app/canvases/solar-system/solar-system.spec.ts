describe('Road tile reader', () => {
  it('should extract some numbers using a regex and split them into an array', () => {
    const re = /(\w)(\d*)/;
    const testStr = 'r1234';
    const match = re.exec(testStr);
    expect(match[2].split('')).toStrictEqual(['1', '2', '3', '4']);
  });

  it('should extract some numbers using a regex, split them into an array and convert them to integers', () => {
    const re = /(\w)(\d*)/;
    const testStr = 'r1234';
    const match = re.exec(testStr);
    expect(match[2].split('').map((i) => parseInt(i))).toStrictEqual([
      1, 2, 3, 4,
    ]);
  });
});

describe('Road tile reader', () => {
  const animations = [];

  function translate() {
    let time = 0;
    animations.push(() => {
      time += 1;
      console.log(time);
    });
  }

  translate();
  translate();

  animations[0]();
  animations[1]();
});
