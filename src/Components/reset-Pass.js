import React from 'react';

// import formik
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

//import components
import { TextField } from './text-field';

//import css
import '../App.css';

const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    Verification : Yup.string()
      .min(12, 'In correct Code')
      .required('Try Again later'),
  })

class ResetPass extends React.Component {
  render(){
    return (
        <Formik
          initialValues={{
            email: '',
            Verification : '',
          }}
          validationSchema={validate}
          onSubmit={values => {
            console.log(values)
          }}
        >
          {formik => (  
              <Form>
                <div className='my-div'>
                    <TextField  placeholder='E-mail'  name="email" type="email" />
                    <div className='pass-field'>
                        <TextField placeholder='Verification Code'  name="Verification" 
                            type= 'number'
                        />
                    </div>
                    <button className="myButton" type="submit">Sign In</button>
                </div>
              </Form>
          )}
        </Formik>
      )
  }
}
export default ResetPass ;