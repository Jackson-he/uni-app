import { EventChannel } from '@dcloudio/uni-shared'
import {
  createApp,
  createPage,
  createComponent,
} from '@dcloudio/uni-mp-weixin/src/runtime'

export * from '@dcloudio/uni-mp-weixin/src/runtime'
;(qq as any).EventChannel = EventChannel
;(qq as any).createApp = createApp
;(qq as any).createPage = createPage
;(qq as any).createComponent = createComponent