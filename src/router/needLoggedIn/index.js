import Exporter from './Exporter'
import Importer from './Importer'

export default [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile')
  },
  {
    path: '/profile/:id',
    name: 'ProfileId',
    component: () => import('@/views/Profile'),
    props: true
  },
  ...Exporter,
  ...Importer
]
