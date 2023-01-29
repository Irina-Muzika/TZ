import { useFormik } from 'formik';
import React, { useState } from 'react';
import Error from '../components/Error';
import * as Yup from 'yup';
import Api from '../Api/index.js';
import LoadingAnimation from '../components/LoadingAnimation/index.js';
import { NavLink } from 'react-router-dom';
import HeaderLayout from '../components/Layout/HeaderLayout.js';
import styles from './Home.module.css'
import './global.css'

const validationSchema = Yup.object({
    Vin: Yup.string()
        .required('Field is required')
        .matches(/^[a-zA-Z0-9]+$/, 'Field contains prohibited characters')
        .matches(/^[A-Z0-9]+$/, 'Must be uppercase')
        .length(17, 'Field must be less than 17 characters')
})

function Home() {
    const [vinVehileList, setVinVehileList] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [historyList, setHistoryList] = useState([])
    const formik = useFormik({
        initialValues: {
            Vin: 'JN1AZ4EH7DM430111',
        },
        validationSchema,
        onSubmit: value => {
            setLoading(true)

            Api
                .getVinVehicle(value.Vin)
                .then(list => {
                    const listVehile = []
                    list?.Results.forEach(res => {
                        if (res.Value) {
                            listVehile.push(res)
                        }
                    })
                    setVinVehileList(listVehile)
                    setError('')
                })
                .catch(err => setError(err))
                .finally(() => {
                    setLoading(false)
                })

            setHistoryList([...historyList, value.Vin].slice(-5))
        }
    })

    return (
        <>
            <HeaderLayout>
                <NavLink className={styles.a} to={'/variables'}>Variables</NavLink>
            </HeaderLayout>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.div}>
                    <label className={styles.label} htmlFor="Vin">Vin</label>
                    <input
                        className={styles.inp}
                        id='Vin'
                        placeholder='Enter VIN code'
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.Vin}
                    />
                    <button className={styles.btn} disabled={!formik.isValid} type='submit'>Get</button>
                    <Error value={formik.errors.Vin} />
                 
                </div>
                
            </form>
            {error && (
                <Error value={error} />
            )}
            {loading && (
                <LoadingAnimation loading={loading} />
            )}
            <ul className={styles.ul}>
                {vinVehileList.length > 0 && (
                    vinVehileList.map(res =>
                        <li
                            key={res.VariableId}
                        >
                            {res.Variable}: {res.Value}
                        </li>
                    )
                )}
            </ul>
            <ul className={styles.ul}>
                {historyList.length > 0 && (
                    historyList.map((histor, index) => <li key={index}>{histor}</li>)
                )}
            </ul>
        </>
    );
}

export default Home;