import {Body, Controller, Get, Param, Post, Query, Res } from 'texdec/dist';
import {TestContrConfig} from './test-contr.config'
import {TestContrHooks} from './test-contr.hooks'
import {Session} from '../../myVariable'

@Controller('test-ctrl', TestContrConfig)
class TestContrController {
  private counter = 0

  constructor(test: TestContrHooks) {
  }

  @Get('/:id/:uuid', )
  test(
    @Session('mongoconnecitone2') mongoSession2: any,
    @Param('uuid') code: string,
    @Query() name: string,
    @Param() id: number,
    @Session('mongoconnecitone') mongoSession: any,
  ) {
    return { name: name, id: id, uuid: code, mongoSession }
  }
}
