import React from "react";
import styles from "./toggleswitch.module.css";
const ToggleSwitch = ({ innerRef,name,value,onChange }) => {
    return (
      <div className={styles.container}>
        <div className={styles.toggleSwitch}>
          <input ref={innerRef} type="checkbox" className={styles.checkbox} 
                 name={name} id={name} checked={value} onChange={onChange}/>
          <label className={styles.label} htmlFor={name}>
            <span className={styles.inner} />
            <span className={styles.switch} />
          </label>
        </div>
      </div>
    );
  };
  export default ToggleSwitch;