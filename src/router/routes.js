
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'Home',
        path: '/',
        component: () => import('pages/Index.vue') },
      { name: 'Crossing (HTML5 canvas)',
        path: 'crossing-canvas',
        instructions: '⬅️ ➡️',
        component: () => import('pages/CrossingCanvas.vue') },
      { name: 'Crossing (phaser.io)',
        path: 'crossing-phaser',
        instructions: '☝️',
        component: () => import('pages/CrossingPhaser.vue') },
      { name: 'Virtual Pet',
        path: 'virtual-pet',
        instructions: '☝️',
        component: () => import('pages/VirtualPet.vue') },
      { name: 'Spanish',
        path: 'spanish',
        instructions: '☝️',
        component: () => import('pages/Spanish.vue') },
      { name: 'Monster Kong',
        path: 'monster-kong',
        instructions: '⬅️ ➡️ ⬆️',
        component: () => import('pages/MonsterKong.vue') },
      { name: 'Tower Defense',
        path: 'tower-defense',
        instructions: '(work in progress)',
        component: () => import('pages/TowerDefense.vue') },
      { name: '5-Tentacle Space Melody',
        path: '5-tentacle-space-melody',
        instructions: '☝️',
        component: () => import('pages/FiveTentacleSpaceMelody.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
