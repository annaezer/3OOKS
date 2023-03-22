import React from "react";
import styles from "./Input.module.css";

function Input({inputType, inputName, inputPlaceholder, inputId, labelText, validationRules, register, errors}) {
    return (
        <>
            <div><label htmlFor={inputId} className={styles["label-text"]}>{labelText}</label></div>
            <input
                className={styles.input}
                placeholder={inputPlaceholder}
                type={inputType}
                id={inputId}
                {...register(inputName, validationRules)}
            />
            {errors[inputName] && <p className={styles["error-message"]}>{errors[inputName].message}</p>}
        </>
    );
}

export default Input;
