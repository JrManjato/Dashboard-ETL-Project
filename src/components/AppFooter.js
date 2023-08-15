import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://github.com/DONNEES2/ETL-processing" target="_blank" rel="noopener noreferrer">
          ETL-Processing
        </a>
        <span className="ms-1">&copy; 2023 Data&IA.</span>
      </div>
      <div className="ms-auto">
        Powered by
        <span className="me-1" style={{color: 'blue'}}> PyData Pirates</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
