
export const vertex = `

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }

`

export const fragment = `

  varying vec2 vUv;
  uniform float time;

  void main() {
    gl_FragColor = vec4(abs(sin(time)), 1.0, 1.0, 1.0);
  }

`
