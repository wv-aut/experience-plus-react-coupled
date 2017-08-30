import { connect } from 'react-redux'
import { changeDate } from '../modules/profileForm'
import { changeInput, changeInputWithValidation } from '../../../modules/profile'

import BirthDateForm from '../components/BirthDateForm'

const mapDispatchToProps = {
  changeDate,
  changeInput,
  changeInputWithValidation
}

const mapStateToProps = (state) => ({
  profile: state.profile
}
)

export default connect(mapStateToProps, mapDispatchToProps)(BirthDateForm)
