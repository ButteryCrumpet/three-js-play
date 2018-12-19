import * as Three from "three"
import * as Shaders from "./shaders"

function init() {
  const container = document.getElementById("container")

  if (!container) {
    return
  }

  const renderer = new Three.WebGLRenderer({alpha: true})
  container.appendChild(renderer.domElement)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new Three.Scene()
  const clock = new Three.Clock()

  let w = renderer.domElement.getBoundingClientRect().width;
  let h = renderer.domElement.getBoundingClientRect().height;

  const camera = new Three.PerspectiveCamera(75, w / h, 0.1, 10000);
  camera.position.z = 5
  scene.add(camera)
  
  
  let uniforms = {
    u_time: { value: 1.0 },
    u_mouse: { value: new Three.Vector2()},
    u_resolution: { type: "v2", value: new Three.Vector2() },
  }
  const material = new Three.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: Shaders.vertex,
    fragmentShader: Shaders.fragment,
    transparent: true
  })

  const bg = new Three.Mesh( new Three.PlaneBufferGeometry(4, 4), material)
  scene.add( bg )

  uniforms.u_resolution.value.x = w
  uniforms.u_resolution.value.y = h


  container.addEventListener("mousemove", (e) => {
    e.preventDefault()
    uniforms.u_mouse.value.x = (e.clientX)
    uniforms.u_mouse.value.y = h - (e.clientY)
  })

  window.addEventListener('resize', (_) => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    w = renderer.domElement.getBoundingClientRect().width
    h = renderer.domElement.getBoundingClientRect().height
    uniforms.u_resolution.value.x = w
    uniforms.u_resolution.value.y = h
  })

  animate(() => {
    var delta = 5 * clock.getDelta()
    uniforms.u_time.value += 0.2 * delta
    renderer.render(scene, camera)
  })
}

function animate(render) {
  requestAnimationFrame(() => animate(render))
  render()
}


init()
