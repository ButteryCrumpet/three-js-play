
export const vertex = `

  varying vec2 v_uv;

  void main() {
    v_uv = uv;
    gl_Position = vec4(position, 1.0);
  }

`

export const fragment = `

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform sampler2D u_texture;

  void main() {
    float dist = distance(gl_FragCoord.xy, u_mouse);
    float max = u_resolution.y * 0.25;
    float min = u_resolution.y * 0.10;
    float alpha = smoothstep(min, max, clamp(dist, 0.0, max));
    vec4 tex_color = step(vec4(0.3,0.3,0.3,1.0), texture2D(u_texture, vec2(v_uv.x + u_time, v_uv.y)));
    gl_FragColor = vec4(tex_color.x, tex_color.y, tex_color.z, alpha);
  }

`
