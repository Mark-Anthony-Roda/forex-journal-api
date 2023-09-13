import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('instrument', 'InstrumentsController.store')
  Route.post('add-instrument', 'UserInstrumentsController.__invoke')
  Route.put('instrument/:id', 'InstrumentsController.update')
  Route.get('instruments', 'InstrumentsController.index')
  Route.get('instrument/:id', 'InstrumentsController.show')
  Route.delete('instrument/:id', 'InstrumentsController.destroy')
})
  .prefix('/v1/')
  .namespace('App/Controllers/Http/V1')
  .middleware(['auth'])
