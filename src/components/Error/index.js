import React from 'react';
import styles from './Error.module.css'

function Error({ value }) {
    return value && <span className={styles.error}>{value}</span>
}

export default Error;