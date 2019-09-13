
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'Home',
        path: '/',
        component: () => import('pages/Index.vue') },
      { name: 'HearthClone (Vue and requestAnimationFrame())',
        path: 'hearthclone',
        instructions: 'Mouse',
        component: () => import('pages/HearthClone.vue') },
      { name: 'Crossing (HTML5 canvas)',
        path: 'crossing-canvas',
        instructions: 'Arrow Keys:  ⬅️ ➡️',
        component: () => import('pages/CrossingCanvas.vue') },
      { name: 'Crossing (phaser.io)',
        path: 'crossing-phaser',
        instructions: '☝WASD Keys and Mouse',
        component: () => import('pages/CrossingPhaser.vue') },
      { name: 'Virtual Pet (phaser.io)',
        path: 'virtual-pet',
        instructions: 'Mouse and Touch',
        component: () => import('pages/VirtualPet.vue') },
      { name: 'Spanish (phaser.io)',
        path: 'spanish',
        instructions: 'Mouse and Touch',
        component: () => import('pages/Spanish.vue') },
      { name: 'Monster Kong (phaser.io)',
        path: 'monster-kong',
        instructions: 'Arrow Keys: ⬅️ ➡️ ⬆️',
        component: () => import('pages/MonsterKong.vue') }
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
