/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import 'App/Routes/V1/Auth'
import 'App/Routes/V1/Trade'
import 'App/Routes/V1/InstrumentCategory'
import 'App/Routes/V1/Instrument'

Route.get('/', async () => {
  return { hello: 'world' }
})
