import React from 'react'

import {
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import * as coreuiIcons from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import jsonData from './Provider'


const Dashboard = () => {

  const Average = (max, min) => {
    if (max !== undefined && min !== undefined) {
      return (max + min) / 2;
    } else {
      return null;
    }
  }

  const progressColor = (average) => {
    if (average < 25) {
      return 'success';
    }
    if (average <= 50 && average >= 25) {
      return 'warning';
    }
    if (average > 50) {
      return 'danger'
    }
  }

  function formatDate(inputDate) {
    const dateParts = inputDate.split('-');
    const year = dateParts[0].substring(2); // Get last two digits of the year
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}/${month}/${year}`;
  }

  function formatCountryCode(countryCode) {
    return "cif" + countryCode.charAt(0).toUpperCase() + countryCode.charAt(1).toLowerCase();
  }

  function formatDateTime(dateTimeString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
  }

  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Company Airline</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Departure Information</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Arrival Information</CTableHeaderCell>
            <CTableHeaderCell>Weather description</CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Probability of flight cancellation
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {jsonData.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <span>{item.company_airline}</span>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CIcon size="xl" icon={coreuiIcons[formatCountryCode(item.country)]} title={item.country}/>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <strong>{item.departure_city}</strong>
                <div>{item.departure_airport}</div>
                <span className='text-info'>{formatDateTime(item.departure_scheduled)}</span>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <strong>{item.arrival_city}</strong>
                <div>{item.arrival_airport}</div>
                <span className='text-info'>{formatDateTime(item.arrival_scheduled)}</span>
              </CTableDataCell>
              <CTableDataCell>
                <div className="">
                  <strong>{item.description}</strong>
                  <br/>
                  <u className='text-warning'>Max Temperature:</u> {item.max_temperature}°
                  <br/>
                  <u className='text-success'>Min Temperature:</u> {item.min_temperature}°
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="">
                  <div className="float-start">
                    <strong>{Average(item.max_chance, item.min_chance)} %</strong>
                  </div>
                  <br/>
                  <div>
                    <u className='text-info text-sm' style={{fontSize: '12px'}}>Forecast Day: </u>
                    <small className="text-medium-emphasis">{formatDate(item.forecast_day)}</small>
                  </div>
                  <CProgress thin
                             color={progressColor(Average(item.max_chance, item.min_chance))}
                             value={Average(item.max_chance, item.min_chance)}/>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Dashboard
