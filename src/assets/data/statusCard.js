import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useAuthState } from '../../context/auth'

export const StatusCard = () => {
  const [rifasActives, setRifasActives] = useState(0)
  const [rifasExpired, setRifasExpired] = useState(0)
  const [rifasTotal, setRifasTotal] = useState(0)

  const userDetails = useAuthState()
  
  useEffect(() => {
    axios.get('http://159.203.76.114/api/v1/rifas/actives', {
      headers: {
        Authorization: `Bearer ${userDetails.token}`
      }
    })
      .then(res => {
        setRifasActives(res.data.length)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('http://159.203.76.114/api/v1/rifas/expired', {
      headers: {
        Authorization: `Bearer ${userDetails.token}`
      }
    })
      .then(res => {
        setRifasExpired(res.data.length)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('http://159.203.76.114/api/v1/rifas', {
      headers: {
        Authorization: `Bearer ${userDetails.token}`
      }
    })
      .then(res => {
        setRifasTotal(res.data.length)
      })
      .catch(err => {
        console.log(err)
      })
  }, [userDetails.token])

  return (
    <div className="row">
      <div className="col-lg-4 col-sm-6 col-xs-12 col-status mb-4">
        <div className="card">
          <div className="p-3 card-body">
            <div className="d-flex">
              <div className="status-icon bg-primary">
                <p>.</p>
              </div>
              <div className="ms-3">
                <h5 className="mb-0 font-weight-bold">{rifasTotal}</h5>
                <small className="text-muted">Rifas Totales</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-sm-6 col-xs-12 col-status mb-4">
        <div className="card">
          <div className="p-3 card-body">
            <div className="d-flex">
              <div className="status-icon bg-success">
                <p>.</p>
              </div>
              <div className="ms-3">
                <h5 className="mb-0 font-weight-bold">{rifasActives}</h5>
                <small className="text-muted">Rifas Activas</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-sm-12 col-xs-12 col-status mb-4">
        <div className="card">
          <div className="p-3 card-body">
            <div className="d-flex">
              <div className="status-icon bg-danger">
                  <p>.</p>
                </div>
              <div className="ms-3">
                <h5 className="mb-0 font-weight-bold">{rifasExpired}</h5>
                <small className="text-muted">Rifas Expiradas</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}