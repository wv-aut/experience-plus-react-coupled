import { connect } from 'react-redux'
import { changeDate } from '../modules/userForm'
import { changeInput } from '../../../modules/user'

import BirthDateForm from '../components/BirthDateForm'

const mapDispatchToProps = {
  changeDate,
  changeInput
}

const mapStateToProps = (state) => ({
  user: state.user
}
)

export default connect(mapStateToProps, mapDispatchToProps)(BirthDateForm)
