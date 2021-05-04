import express, {Express} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {TExDecSettings, CastHelper, TExDec} from 'texdec/dist'
import {join} from 'path'
import {Server as HttpServer} from 'http'
import {MyVariable} from './myVariable'
import {TestContrHooks} from './modules/test-contr/test-contr.hooks'

const texDecSettings = TExDecSettings.getInstance()

class MyCastHelper extends CastHelper {
  Date = (val: string) => val
}

export const app: Express = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser('RANDOM_STRING'))

texDecSettings.set('castHelper', MyCastHelper)
texDecSettings.set('webLogger', console)
texDecSettings.set('routerLogger', console)
texDecSettings.set('baseRoute', '/api/v1')
texDecSettings.set('controllerDir', join(__dirname, 'modules'))
MyVariable.init()


TExDec.init(app)
  .then(() => {
      const http = new HttpServer(app)
      http.listen(3000, async () => {
        console.info(`server started at http://localhost:${3000}`)
      })
    }
  )

