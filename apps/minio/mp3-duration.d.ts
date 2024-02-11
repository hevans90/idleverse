declare module 'mp3-duration' {
  function main(
    filePath: string,
    result: (err: unknown, duration: number) => void
  );

  export = main;
}
