import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('instrument-category', 'InstrumentCategoriesController.store')
  Route.put('instrument-category/:id', 'InstrumentCategoriesController.update')
  Route.get('instrument-categories', 'InstrumentCategoriesController.index')
  Route.get('instrument-category/:id', 'InstrumentCategoriesController.show')
  Route.delete('instrument-category/:id', 'InstrumentCategoriesController.destroy')
})
  .prefix('/v1/')
  .namespace('App/Controllers/Http/V1')
  .middleware(['auth'])
