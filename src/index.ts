import * as Three from "three"
import * as Shaders from "./shaders"

function init() {
  const container = document.getElementById("container")

  if (!container) {
    return
  }
  const scene = new Three.Scene()
  const clock = new Three.Clock()
  const width = window.innerWidth;
  const height = window.innerHeight;
  const camera = new Three.OrthographicCamera(
    width / 2,
    width / 2,
    height / 2,
    height / 2
  )
  scene.add(camera)
  
  
  let uniforms = {
    time: { value: 1.0 },
  }
  const material = new Three.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: Shaders.vertex,
    fragmentShader: Shaders.fragment
  })
  const mesh = new Three.Mesh( new Three.PlaneBufferGeometry(2, 2), material)
  scene.add(mesh)

  const renderer = new Three.WebGLRenderer()
  container.appendChild(renderer.domElement)
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.render(scene, camera)

  

  animate(() => {
    var delta = 5 * clock.getDelta()
    uniforms.time.value += 0.2 * delta;
    renderer.clear();
  })
}

function animate(render) {
  requestAnimationFrame(() => animate(render))
  render()
}


init()
