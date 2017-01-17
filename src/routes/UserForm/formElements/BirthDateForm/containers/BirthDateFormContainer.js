import { connect } from 'react-redux'
import { changeDate } from '../modules/userForm'

import BirthDateForm from '../components/BirthDateForm'


const mapDispatchToProps = {
  changeDate
}


const mapStateToProps = (state) => ({
  user: state.user
}
)

export default connect(mapStateToProps, mapDispatchToProps)(BirthDateForm)
