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

  const cellWidth = 200;

  const textStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: 'zx spectrum',
    fontSize: '12px',
    fill: '#fff',
    align: 'center',
    stroke: '#000',
    strokeThickness: 0,
  };

  for (let column = 0; column < columns + 1; column++) {
    for (let row = 0; row < rows + 1; row++) {
      const grid = new PIXI.Graphics();

      const text = new PIXI.Text(
        `${Math.floor(column * cellWidth)}, ${Math.floor(row * cellWidth)} `,
        textStyle
      );

      const xChunk = column * cellWidth;
      const nextXChunk = (column + 1) * cellWidth;
      const yChunk = row * cellWidth;
      const nextYChunk = (row + 1) * cellWidth;

      text.position.x = xChunk;
      text.position.y = yChunk;
      grid.lineStyle(1, hexStringToNumber(gridColor), 0.6);

      // ----> x
      grid.moveTo(xChunk, yChunk);

      // <==== x
      grid.lineTo(nextXChunk, yChunk);

      // |
      // |
      // \/

      grid.moveTo(nextXChunk, nextYChunk);

      // /\
      // ||
      // ||
      grid.lineTo(nextXChunk, yChunk);

      if (column !== -columns - 1 && row !== -rows - 1) {
        container.addChild(text);
        container.addChild(grid);
      }
    }
  }

  container.name = 'grid';
  return container;
};
