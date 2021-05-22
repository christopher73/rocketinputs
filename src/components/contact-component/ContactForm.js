import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../hooks/useForm';

export default function ContactForm(props) {
    const { addOrEdit, recordForEdit, filter } = props

    const initialFValues = { 
      id:'',
      nickName:'',
      firstName:'',
      middleName:'',
      lastName:'',
      address:'',
      cellPhone:'',
      phone:'',
      fax:'',
      email:'',
      isPotential:(filter === "POTENTIAL"? true:false), 
      hasAccount:(filter === "ACCOUNT"? true:false)
    }

    const validate = (fieldValues = values) => {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let temp = { ...errors }
        if ('nickName' in fieldValues)
            temp.nickName = fieldValues.nickName ? "" : "This field is required."
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('middleName' in fieldValues)
            temp.middleName = fieldValues.middleName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."
        if ('cellPhone' in fieldValues)
            temp.cellPhone = fieldValues.cellPhone ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This field is required."
        if ('fax' in fieldValues)
            temp.fax = fieldValues.fax ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (pattern).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({...temp})

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({ ...recordForEdit })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="nickName"
                        label={"Nick\u00a0Name"}
                        value={values.nickName}
                        onChange={handleInputChange}
                        error={errors.nickName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label={"First\u00a0Name"}
                        name="firstName"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                    <Controls.Input
                        label={"Middle\u00a0Name"}
                        name="middleName"
                        value={values.middleName}
                        onChange={handleInputChange}
                        error={errors.middleName}
                    />
                    <Controls.Input
                        label={"Last\u00a0Name"}
                        name="lastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label={"Address"}
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address}
                    />
                    <Controls.Input
                        label={"Cell\u00a0Phone"}
                        name="cellPhone"
                        value={values.cellPhone}
                        onChange={handleInputChange}
                        error={errors.cellPhone}
                    />
                    <Controls.Input
                        label={"Phone"}
                        name="phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                    <Controls.Input
                        label={"Fax"}
                        name="fax"
                        value={values.fax}
                        onChange={handleInputChange}
                        error={errors.fax}
                    />
                    <div>
                        <Controls.Button type="submit" text="Submit" />
                        <Controls.Button text="Reset" color="default" onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}