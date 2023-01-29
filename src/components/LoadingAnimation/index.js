import React from 'react';
import styles from "./LoadingAnimation.module.css";

function LoadingAnimation({ loading }) {
    return (
        <div className={styles.spinner}></div>
    );
}

export default LoadingAnimation;