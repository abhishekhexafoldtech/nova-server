import { ElNotification } from 'element-plus'
import { capitalizeFirstLetter } from '@/helpers/helper'

// type: success, warning, info, error
export const flashNotification = (type,msg) => {
  ElNotification({
    title: capitalizeFirstLetter(type),
    message: msg,
    type: type,
  })
}



