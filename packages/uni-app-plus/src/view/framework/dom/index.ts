import {
  PageAction,
  ACTION_TYPE_PAGE_CREATE,
  ACTION_TYPE_PAGE_CREATED,
  ACTION_TYPE_CREATE,
  // ACTION_TYPE_INSERT,
  ACTION_TYPE_REMOVE,
  ACTION_TYPE_SET_ATTRIBUTE,
  ACTION_TYPE_REMOVE_ATTRIBUTE,
  ACTION_TYPE_ADD_EVENT,
  ACTION_TYPE_REMOVE_EVENT,
  ACTION_TYPE_SET_TEXT,
} from '@dcloudio/uni-shared'
import { UniNodeJSONMinify } from 'packages/uni-shared/src/vdom/Node'
import { ACTION_TYPE_DICT, DictAction, Dictionary } from '../../../constants'
import { createGetDict, decodeNodeJson } from './decodeActions'
import { $, createElement, onPageCreate, onPageCreated } from './page'
import { flushPostActionJobs } from './scheduler'

export function onVdSync(actions: (PageAction | DictAction)[]) {
  const dictAction = actions[0]
  const getDict = createGetDict(
    dictAction[0] === ACTION_TYPE_DICT ? (dictAction[1] as Dictionary) : []
  )

  actions.forEach((action) => {
    switch (action[0]) {
      case ACTION_TYPE_PAGE_CREATE:
        return onPageCreate(action[1])
      case ACTION_TYPE_PAGE_CREATED:
        return onPageCreated()
      case ACTION_TYPE_CREATE:
        return createElement(
          action[1],
          getDict(action[2] as number),
          action[3],
          action[4],
          decodeNodeJson(getDict, action[5] as UniNodeJSONMinify)
        )
      // case ACTION_TYPE_INSERT:
      //   return $(action[1]).insert(action[2], action[3])
      case ACTION_TYPE_REMOVE:
        return $(action[1]).remove()
      case ACTION_TYPE_SET_ATTRIBUTE:
        return $(action[1]).setAttr(
          getDict(action[2] as number),
          getDict(action[3] as number)
        )
      case ACTION_TYPE_REMOVE_ATTRIBUTE:
        return $(action[1]).removeAttr(getDict(action[2] as number))
      case ACTION_TYPE_ADD_EVENT:
        return $(action[1]).addEvent(getDict(action[2] as number), action[3])
      case ACTION_TYPE_REMOVE_EVENT:
        return $(action[1]).removeEvent(getDict(action[2] as number))
      case ACTION_TYPE_SET_TEXT:
        return $(action[1]).setText(getDict(action[2] as number))
    }
  })
  flushPostActionJobs()
}
