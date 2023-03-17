import React from "react";
import "./Input.css";

function Input({inputType, inputName, inputPlaceholder, inputId, validationRules, register, errors}) {
    return (
        <>
            <label htmlFor={inputId}>
                <input
                    placeholder={inputPlaceholder}
                    type={inputType}
                    id={inputId}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p className="error-message">{errors[inputName].message}</p>}
        </>
    );
}

export default Input;
