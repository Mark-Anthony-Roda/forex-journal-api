import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login-admin', 'AuthController.loginAdmin')
})
  .prefix('/v1/')
  .namespace('App/Controllers/Http/V1')
