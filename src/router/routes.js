
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'Home',
        path: '',
        component: () => import('pages/Index.vue') },
      { name: 'Crossing (HTML5 canvas)',
        path: 'crossing-canvas',
        component: () => import('pages/CrossingCanvas.vue') },
      { name: 'Crossing (phaser.io)',
        path: 'crossing-phaser',
        component: () => import('pages/CrossingPhaser.vue') },
      { name: 'Virtual Pet',
        path: 'virtual-pet',
        component: () => import('pages/VirtualPet.vue') },
      { name: 'Spanish',
        path: 'spanish',
        component: () => import('pages/Spanish.vue') },
      { name: 'Monster Kong',
        path: 'monster-kong',
        component: () => import('pages/MonsterKong.vue') },
      { name: 'Tower Defense',
        path: 'tower-defense',
        component: () => import('pages/TowerDefense.vue') },
      { name: '5-Tentacle Space Melody',
        path: '5-tentacle-space-melody',
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
