// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_offset;
uniform float u_color[3];

uniform float u_radius;
uniform float u_density;
uniform float u_brightness;
uniform float u_coronal_strength;
uniform float u_time;
uniform sampler2D noiseSample;

float snoise(vec3 uv,float res)// by trisomie21
{
    const vec3 s=vec3(1e0,1e2,1e4);
    
    uv*=res;
    
    vec3 uv0=floor(mod(uv,res))*s;
    vec3 uv1=floor(mod(uv+vec3(1.),res))*s;
    
    vec3 f=fract(uv);f=f*f*(3.-2.*f);
    
    vec4 v=vec4(uv0.x+uv0.y+uv0.z,uv1.x+uv0.y+uv0.z,
    uv0.x+uv1.y+uv0.z,uv1.x+uv1.y+uv0.z);
    
    vec4 r=fract(sin(v*1e-3)*1e5);
    float r0=mix(mix(r.x,r.y,f.x),mix(r.z,r.w,f.x),f.y);
    
    r=fract(sin((v+uv1.z-uv0.z)*1e-3)*1e5);
    float r1=mix(mix(r.x,r.y,f.x),mix(r.z,r.w,f.x),f.y);
    
    return mix(r0,r1,f.z)*2.-1.;
}

void main()
{
    
    float radius=(u_radius/10.)+u_brightness*.02;
    float invRadius=1./radius;
    
    // vec3 orange=vec3(.8,.65,.3);
    // vec3 orangeRed=vec3(.8,.35,.1);
    vec3 orange=vec3(.8*u_color[0],.65*u_color[1],.3*u_color[2]);
    vec3 orangeRed=vec3(.8*u_color[0],.35*u_color[1],.1*u_color[2]);
    
    float time=u_time*.1;
    float aspect=u_resolution.x/u_resolution.y;
    vec2 uv=vec2(gl_FragCoord.x-2.*u_offset.x,gl_FragCoord.y-2.*u_offset.y)/u_resolution.xy;
    vec2 p=uv;
    p.x*=aspect;
    
    float fade=pow(length(2.*p),.5);
    float fVal1=1.-fade;
    float fVal2=1.-fade;
    
    float angle=atan(p.x,p.y)/6.2832;
    float dist=length(p);
    vec3 coord=vec3(angle,dist,time*.1);
    
    float newTime1=abs(snoise(coord+vec3(0.,-time*(.35+u_brightness*.001),time*.015),15.));
    float newTime2=abs(snoise(coord+vec3(0.,-time*(.15+u_brightness*.001),time*.015),45.));
    for(int i=1;i<=7;i++){
        float power=pow(2.,float(i+1));
        fVal1+=(.5/power)*snoise(coord+vec3(0.,-time,time*.2),(power*(10.)*(newTime1+1.)));
        fVal2+=(.5/power)*snoise(coord+vec3(0.,-time,time*.2),(power*(25.)*(newTime2+1.)));
    }
    
    float corona=pow(fVal1*max(1.1-fade,0.),2.)*(100.*u_coronal_strength);
    corona+=pow(fVal2*max(1.1-fade,0.),2.)*(100.*u_coronal_strength);
    corona*=((u_coronal_strength+.4)-newTime1);
    
    vec3 starSphere=vec3(0.);
    
    vec2 sp=2.*uv;
    sp.x*=aspect;
    sp*=(2.-u_brightness);
    float r=dot(sp,sp);
    float f=(1.-sqrt(abs(1.-r)))/(r)+u_brightness*.5;
    
    if(dist<radius){
        corona*=pow(dist*invRadius,24.);
        vec2 newUv;
        newUv.x=sp.x*f;
        newUv.y=sp.y*f;
        newUv+=vec2(time,0.);
        
        vec3 texSample=texture2D(noiseSample,newUv).rgb;
        float uOff=(texSample.g*u_brightness*(5.*u_density)+time);
        vec2 starUV=newUv+vec2(uOff,0.);
        starSphere=texture2D(noiseSample,starUV).rgb;
    }
    
    vec3 colorWithGlow=vec3(f*(.75+u_brightness*.3)*orange);
    if(dist>(radius)){
        colorWithGlow=vec3(0);
    }
    
    float starGlow=min(max(1.-dist*(1.-u_brightness),0.),1.)*u_brightness;
    vec3 color=colorWithGlow+starSphere+corona*orange+starGlow*orangeRed;
    gl_FragColor=vec4(color,0);
}