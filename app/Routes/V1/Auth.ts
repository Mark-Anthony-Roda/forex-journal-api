import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('login-admin', 'AuthController.loginAdmin')
  Route.get('me', 'AuthController.authUser').middleware(['auth'])
})
  .prefix('/v1/')
  .namespace('App/Controllers/Http/V1')
