import { Stage, Container, Sprite, Text, useTick } from '@inlet/react-pixi';
import { useReducer, useRef, useState } from 'react';
import * as PIXI from 'pixi.js'

export const Game = ({ data }: any) => {
  return (<Stage>
    <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={100} y={100} />
  </Stage>)
}