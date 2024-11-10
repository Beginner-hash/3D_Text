import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Font
 */

const fontLoader = new FontLoader()

// Textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/11.png')
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Apple Vision Pro', {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 30,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 30,
  })

  //   textGeometry.computeBoundingBox()
  textGeometry.center()
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) / 2,
  //     -(textGeometry.boundingBox.max.y - 0.02) / 2,
  //     -(textGeometry.boundingBox.max.z - 0.03) / 2
  //   );
  const text = new THREE.Mesh(textGeometry, material)
  //   text.position.x = -(
  //     (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) /
  //     2
  //   );
  scene.add(text)
})

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const Icosahedron = new THREE.IcosahedronGeometry(0.3, 2)

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

for (let i = 0; i < 10000; i++) {
  let mesh = new THREE.Mesh()
  switch (randomIntFromInterval(1, 3)) {
    case 1:
      mesh = new THREE.Mesh(donutGeometry, material)
      break

    case 2:
      mesh = new THREE.Mesh(Icosahedron, material)
      break

    default:
      mesh = new THREE.Mesh(donutGeometry, material)
      break
  }

  mesh.position.x = (Math.random() - 0.5) * 100
  mesh.position.y = (Math.random() - 0.5) * 100
  mesh.position.z = (Math.random() - 0.5) * 100

  mesh.rotation.x = Math.random() * Math.PI
  mesh.rotation.y = Math.random() * Math.PI

  const scale = Math.random()
  mesh.scale.set(scale, scale, scale)
  scene.add(mesh)
}

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(
  80,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 0.5
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Calculate the camera's new position
  //   const radius = 5 // Distance from the object
  //   const angle = Date.now() * 0.0005 // Animation speed
  //   const x = Math.sin(angle) * radius
  //   const z = Math.cos(angle) * radius

  // Update the camera position
  //camera.position.set(x, 0.5, z)

  camera.position.x = 7 * Math.cos(elapsedTime * 0.3)
  camera.position.z = 7 * Math.sin(elapsedTime * 0.3)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
