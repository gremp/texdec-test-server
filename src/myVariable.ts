import {TExDecSettings, RouteParamTypeHelper, variableDecoratorGenerator} from 'texdec/dist'
import {Request} from 'express'

class MyCustomRouteParam extends RouteParamTypeHelper {
  User = { path: 'req.user', useFullObject: true }
  Session = {  path: null, useFullObject: true, before: sessionBefore, after: sessionAfter}
}


function sessionBefore(req: Request, ...args: any[]) {
  class MySession {
    name = 'george'
    rnd: number
    constructor() {
      this.name = args[0];
      this.rnd = Math.random()
    }
  }

  return new Promise((resolve, reject) => {
    const ss = new MySession()
    console.log(ss.rnd, ss.name)
    setTimeout(() => {resolve(ss)}, 500)
  })
}

function sessionAfter(req: Request, endpointResult: any, beforeParam: any, ...args: any[]) {
  return new Promise((resolve, reject) => {
    console.log(beforeParam.rnd, beforeParam.name)
    setTimeout(() => {
      return reject(new Error('test'))
      resolve(beforeParam)
    }, 500)

  })

}


export class MyVariable {
  static init() {
    const texDecSettings = TExDecSettings.getInstance()
    texDecSettings.set('routeParamHelper', MyCustomRouteParam)
  }
}

// Full Object path variable
export function User() {
  return variableDecoratorGenerator('User', null, false)
}


// Key Specific variable
export function KeySpecific(parameterName: string | null | undefined = undefined, castToType: boolean = true) {
  return variableDecoratorGenerator('KeySpecific', parameterName, castToType)
}

export function Session(mongoConnection: any) {
  return variableDecoratorGenerator('Session', null, false, mongoConnection)
}
