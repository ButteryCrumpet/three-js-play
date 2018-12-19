
export const vertex = `

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }

`

export const fragment = `

  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;

  void main() {
    float dist = distance(gl_FragCoord.xy, u_mouse);
    float max = u_resolution.y * 0.25;
    float a = smoothstep(1.0, max, clamp(dist, 0.0, max));
    gl_FragColor=vec4(0.1, 1.0, 1.0, a);
  }

`
