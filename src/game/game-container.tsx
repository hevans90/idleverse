import { useSubscription } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Stage } from "@inlet/react-pixi";
import {
  IdleGameCountersRealTimeDescDocument,
  IdleGameCountersRealTimeDescSubscription,
} from "../_graphql/api";
import { Game } from "./game";
import { useResize } from "./utils/use-resize.hook";

export const GameContainer = (props: { curvature: number }) => {
  const { data, loading } =
    useSubscription<IdleGameCountersRealTimeDescSubscription>(
      IdleGameCountersRealTimeDescDocument
    );

  const size = useResize();
  if (loading) {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        loading universe...
      </Box>
    );
  } else if (data) {
    return (
      <Stage {...size} options={{ backgroundColor: 0x2d3239, antialias: true }}>
        <Game curvature={props.curvature}></Game>
      </Stage>
    );
  } else {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        Something went wrong. There is no universe.
      </Box>
    );
  }
};
