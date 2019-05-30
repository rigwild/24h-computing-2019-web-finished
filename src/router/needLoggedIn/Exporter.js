export default [
  {
    path: '/orders',
    name: 'ExporterOrders',
    component: () => import('@/views/Exporter/Orders')
  },
  {
    path: '/order/:id',
    name: 'ExporterOrderId',
    component: () => import('@/views/Exporter/Orders'),
    props: true
  },

  {
    path: '/offers',
    name: 'ExporterOffers',
    component: () => import('@/views/Exporter/Offers')
  },
  {
    path: '/offers/create',
    name: 'ExporterCreateOffer',
    component: () => import('@/views/Exporter/Offers/CreateOffer')
  }
]
