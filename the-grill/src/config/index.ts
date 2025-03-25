import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { faTwitch } from '@fortawesome/free-brands-svg-icons'

const configureFontAwesome = () => {
  library.add(faThumbsUp, faHeadphones, faTwitch, faTrashCan)
}

const configureApp = () => {
  configureFontAwesome()
}

export default configureApp
