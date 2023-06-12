import { PixelateFilter } from '@pixi/filter-pixelate';
import { useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import { useStarField } from '../colyseus-poc/rendering/use-starfield';

const fragment = `
// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_offset;

uniform float u_time;
uniform sampler2D noiseSample;

float snoise(vec3 uv, float res)	// by trisomie21
{
	const vec3 s = vec3(1e0, 1e2, 1e4);
	
	uv *= res;
	
	vec3 uv0 = floor(mod(uv, res))*s;
	vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;
	
	vec3 f = fract(uv); f = f*f*(3.0-2.0*f);
	
	vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
		      	  uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);
	
	vec4 r = fract(sin(v*1e-3)*1e5);
	float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
	
	r = fract(sin((v + uv1.z - uv0.z)*1e-3)*1e5);
	float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
	
	return mix(r0, r1, f.z)*2.-1.;
}

void main()
{

	float brightness	= 0.1;
	float radius		= .24 + brightness * 0.2;
	float invRadius 	= 1.0/radius;
	
	vec3 orange			= vec3( 0.8, 0.65, 0.3 );
	vec3 orangeRed	= vec3( 0.8, 0.35, 0.1 );
	float time		  = u_time * 0.1;
	float aspect	  = u_resolution.x/u_resolution.y;
  vec2 uv			    = vec2(gl_FragCoord.x - 2.* u_offset.x, gl_FragCoord.y - 2.* u_offset.y) / u_resolution.xy;
	vec2 p 			    = uv;
	p.x *= aspect;

	float fade		= pow( length( 2.0 * p ), 0.5 );
	float fVal1		= 1.0 - fade;
	float fVal2		= 1.0 - fade;
	
	float angle		= atan( p.x, p.y )/6.2832;
	float dist		= length(p);
	vec3 coord		= vec3( angle, dist, time * 0.1 );
	
	float newTime1	= abs( snoise( coord + vec3( 0.0, -time * ( 0.35 + brightness * 0.001 ), time * 0.015 ), 15.0 ) );
	float newTime2	= abs( snoise( coord + vec3( 0.0, -time * ( 0.15 + brightness * 0.001 ), time * 0.015 ), 45.0 ) );	
	for( int i=1; i<=7; i++ ){
		float power = pow( 2.0, float(i + 1) );
		fVal1 += ( 0.5 / power ) * snoise( coord + vec3( 0.0, -time, time * 0.2 ), ( power * ( 10.0 ) * ( newTime1 + 1.0 ) ) );
		fVal2 += ( 0.5 / power ) * snoise( coord + vec3( 0.0, -time, time * 0.2 ), ( power * ( 25.0 ) * ( newTime2 + 1.0 ) ) );
	}
	
	float corona		= pow( fVal1 * max( 1.1 - fade, 0.0 ), 2.0 ) * 50.0;
	corona				+= pow( fVal2 * max( 1.1 - fade, 0.0 ), 2.0 ) * 50.0;
	corona				*= 1.2 - newTime1;
	vec3 sphereNormal 	= vec3( 0.0, 0.0, 1.0 );
	vec3 dir 			= vec3( 0.0 );
	vec3 center			= vec3( 0.5, 0.5, 1.0 );
	vec3 starSphere		= vec3( 0.0 );

  vec2 sp =  2. * uv;
	sp.x *= aspect;
	sp *= ( 2.0 - brightness );
  	float r = dot(sp,sp);
	float f = (1.0-sqrt(abs(1.0-r)))/(r) + brightness * 0.5;
	if( dist < radius ){
		corona			*= pow( dist * invRadius, 24.0 );
  		vec2 newUv;
 		newUv.x = sp.x*f;
  		newUv.y = sp.y*f;
		newUv += vec2( time, 0.0 );
	        
		vec3 texSample 	= texture2D( noiseSample, newUv ).rgb;        
		float uOff		= ( texSample.g * brightness * 4.5 + time );
		vec2 starUV		= newUv + vec2( uOff, 0.0 );
		starSphere		= texture2D( noiseSample, starUV ).rgb;
	}
	
	float starGlow	= min( max( 1.0 - dist * ( 1.0 - brightness ), 0.0 ), 1.0 );
	vec3 color = vec3( f * ( 0.75 + brightness * 0.3 ) * orange ) + starSphere + corona * orange + starGlow * orangeRed;
	gl_FragColor = vec4(color, 0);
}`;

export const StarEditor = () => {
  const app = useApp();
  const size = useResize();
  const solarSystemContainerRef = useRef(new PIXI.Container());
  solarSystemContainerRef.current.filterArea = new PIXI.Rectangle(
    0,
    0,
    size.width,
    size.height
  );
  solarSystemContainerRef.current.zIndex = 2;

  const viewport = useViewport({
    app,
    size,
    containerRef: solarSystemContainerRef,
    clampDrag: true,
    clampZoom: { minScale: 0.05, maxScale: 1 },
  });

  const tickerRef = useRef<(delta: number) => void>();
  const filterRef = useRef<PIXI.Filter>();

  const totalTime = useRef<number>(0);

  const starfield = useStarField({ dimensions: size });

  const afterLoad = async () => {
    const bundle = await PIXI.Assets.loadBundle('noise');
    const perlin = bundle['perlin'];
    perlin.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    const uniforms = {
      noiseSample: perlin,
      u_time: 0,
      u_resolution: {
        x: viewport.width,
        y: viewport.height,
      },
      u_offset: {
        // gl_FragCoord begins from the top right rectangle of the first pixel, meaning we need some hacky offset
        x: viewport.width / 4 - 2,
        y: viewport.height / 4 - 2,
      },
    };

    filterRef.current = new PIXI.Filter(null, fragment, uniforms);

    tickerRef.current = (delta) => {
      filterRef.current.uniforms.u_time = totalTime.current;
      totalTime.current += delta / 60;
    };
  };

  viewport?.on('wheel', () => {
    console.log('size', size);
    console.log('viewport', {
      width: viewport.width,
      height: viewport.height,
      scale: { x: viewport.scale.x, y: viewport.scale.y },
    });

    filterRef.current.uniforms.u_resolution = {
      x: viewport.width,
      y: viewport.height,
    };
  });

  useEffect(() => {
    if (viewport) {
      app.ticker?.remove(tickerRef.current);
      afterLoad().then(() => {
        app.ticker?.remove(tickerRef.current);
        if (app.stage) {
          viewport.filterArea = app.renderer.screen;
          viewport.addChild(solarSystemContainerRef.current);
          viewport.addChild(starfield);
          solarSystemContainerRef.current.filters = [
            filterRef.current,
            new PixelateFilter(5),
          ];
          app.ticker.add(tickerRef.current);
        }
      });
    }

    return () => {
      app.ticker?.remove(tickerRef.current);
    };
  }, [size, viewport?.worldWidth]);

  return <></>;
};
