import { hexStringToNumber } from '@idleverse/theme';
import * as PIXI from 'pixi.js';

export const drawGrid = ({
  columns,
  rows,
  height,
  width,
  gridColor,
}: {
  columns: number;
  rows: number;
  height: number;
  width: number;
  gridColor: string;
}) => {
  const container = new PIXI.Container();

  container.position.x = -width / 2;
  container.position.y = -height / 2;

  const chunkWidth = width / columns;
  const chunkHeight = height / rows;

  const textStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: 'zx spectrum',
    fontSize: '12px',
    fill: '#fff',
    align: 'center',
    stroke: '#000',
    strokeThickness: 4,
  };

  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const grid = new PIXI.Graphics();
      const text = new PIXI.Text(
        `${column * chunkWidth}, ${row * chunkHeight} `,
        textStyle
      );

      const xChunk = column * chunkWidth;
      const nextXChunk = (column + 1) * chunkWidth;
      const yChunk = row * chunkHeight;
      const nextYChunk = (row + 1) * chunkHeight;

      text.position.x = xChunk;
      text.position.y = yChunk;
      grid.lineStyle(1, hexStringToNumber(gridColor), 0.6);

      // ----> x
      grid.moveTo(xChunk, yChunk);

      if (row !== 0) {
        // <==== x
        grid.lineTo(nextXChunk, yChunk);
      }

      // |
      // |
      // \/
      grid.moveTo(nextXChunk, nextYChunk);

      if (column !== columns - 1) {
        // /\
        // ||
        // ||
        grid.lineTo(nextXChunk, yChunk);
      }

      container.addChild(grid);
      container.addChild(text);
    }
  }

  // now draw left & bottom lines

  return container;
};
