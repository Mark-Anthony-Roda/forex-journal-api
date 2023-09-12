import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('trade', 'TradesController.store')
  Route.get('trades', 'TradesController.index')
  Route.get('trade/:id', 'TradesController.show')
  Route.delete('trade/:id', 'TradesController.destroy')
})
  .prefix('/v1/')
  .namespace('App/Controllers/Http/V1')
  .middleware(['auth'])
