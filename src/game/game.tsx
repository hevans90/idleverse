import { useApp } from "@inlet/react-pixi";
import { addStats } from "pixi-stats";
import { Viewport } from "pixi-viewport";
import { Text, Container, UPDATE_PRIORITY, Graphics } from "pixi.js";
import { useEffect, useState } from "react";
import { Star } from "./graphics/star";
import { GenerateCelestials, GetCelestialPosition } from "./utils/generate";
import { useResize } from "./utils/use-resize.hook";

export const Game = (props: { curvature: number }) => {
  const app = useApp();

  const size = useResize();

  const [stars] = useState(GenerateCelestials(5000));
  const [galaxyConfig] = useState({
    radius: size.height,
    arms: 3,
    curvature: 3,
    armWidth: 0.05,
    coreRadius: size.height / 50,
    coreConcentrationBias: 1.5,
  });

  useEffect(() => {
    // create viewport
    const viewport = new Viewport({
      screenWidth: size.width,
      screenHeight: size.height,
      worldWidth: size.width,
      worldHeight: size.height,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: app.renderer.plugins.interaction,
    });

    // add the viewport to the stage
    app.stage.addChild(viewport);
    viewport.name = "viewport";

    // activate plugins
    viewport.drag().pinch().wheel().decelerate();

    viewport.clampZoom({ minWidth: 300, maxWidth: 2000 });
    viewport.clamp({ direction: "all" });

    const galaxy = new Container();
    viewport.addChild(galaxy);
    galaxy.name = "galaxy";

    stars.forEach((star) => {
      let _star = Star(GetCelestialPosition(star, galaxyConfig));
      galaxy.addChild(_star);
    });

    const basicText = new Text(`Curvature: ${props.curvature}`, {
      fontFamily: "consolas",
      fontSize: 24,
      fill: 0xffffff,
    });
    basicText.x = 50;
    basicText.y = 100;

    app.stage.addChild(basicText);
    basicText.name = "basicText";

    galaxy.x = size.width / 2;
    galaxy.y = size.height / 2;

    app.ticker.add((delta) => {
      // rotate the container!
      // use delta to create frame-independent transform
      galaxy.rotation -= 0.001 * delta;
    });

    const stats = addStats(document, app);

    app.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when the screen is resized, this effect will reset the viewport's screen dimensions & then re-center
  useEffect(() => {
    const viewport: Viewport = app.stage.getChildByName(
      "viewport"
    ) as unknown as Viewport;

    viewport.screenHeight = size.height;
    viewport.screenWidth = size.width;

    viewport.fitWorld(true);

    console.log(viewport);
  }, [app.stage, size]);

  useEffect(() => {
    let basicText = app.stage.getChildByName("basicText") as Text;
    basicText.text = `Curvature: ${props.curvature}`;

    let newGalaxyConfig = { ...galaxyConfig, curvature: props.curvature };

    let viewport = app.stage.getChildByName("viewport") as Viewport;
    let galaxy = viewport.getChildByName("galaxy") as Container;
    stars.forEach((star, i) => {
      let _star = galaxy.getChildAt(i) as Graphics;
      _star.x = GetCelestialPosition(star, newGalaxyConfig).x;
      _star.y = GetCelestialPosition(star, newGalaxyConfig).y;
    });
  }, [props.curvature]);

  return <></>;
};
