import { connect } from 'react-redux'
import { changeDate } from '../modules/userForm'
import { changeInput, changeTaxOptOutInput } from '../../../modules/user'

import BirthDateForm from '../components/BirthDateForm'

const mapDispatchToProps = {
  changeDate,
  changeInput,
  changeTaxOptOutInput
}

const mapStateToProps = (state) => ({
  user: state.user
}
)

export default connect(mapStateToProps, mapDispatchToProps)(BirthDateForm)
