import { connect } from 'react-redux'
import { sendNewTempKeyRequest } from 'store/auth'

import Auth from '../components/Auth'

const mapDispatchToProps = {
  sendNewTempKeyRequest
}

const mapStateToProps = (state) => (
  {
    auth: state.auth
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
