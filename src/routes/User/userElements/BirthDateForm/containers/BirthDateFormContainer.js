import { connect } from 'react-redux'
import { changeDate } from '../modules/userForm'
import { changeInput, changeInputWithValidation } from '../../../modules/user'

import BirthDateForm from '../components/BirthDateForm'

const mapDispatchToProps = {
  changeDate,
  changeInput,
  changeInputWithValidation
}

const mapStateToProps = (state) => ({
  user: state.user
}
)

export default connect(mapStateToProps, mapDispatchToProps)(BirthDateForm)
