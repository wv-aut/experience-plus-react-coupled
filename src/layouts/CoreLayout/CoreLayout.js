import React from 'react'
import Header from '../../components/Header'
import '../styles/index.scss'

// export const CoreLayout = ({ children }) => (
//   <div className='container text-center'>
//     <Header />
//     <div className='core-layout__viewport'>
//       {children}
//     </div>
//   </div>
// )

class CoreLayout extends React.Component {
  
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
