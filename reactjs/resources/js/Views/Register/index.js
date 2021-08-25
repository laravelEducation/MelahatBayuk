import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {inject,observer} from 'mobx-react';
const Register = (props) =>{
    console.log(props);
    const [errors,setErrors]=useState([]);
    const [error,setError]=useState('');
    useEffect(()=>{
        if (props.AuthStore.appState != null) {
            if (props.AuthStore.appState.isLoggedIn) {
                return props.history.push('/');
            }
        }
    });
    const handleSubmit = (values) =>{
       axios.post(`/api/auth/register`,{...values})
           .then((res)=>{
              if (res.data.success){
                  const userData={
                      id:res.data.id,
                      name:res.data.name,
                      email:res.data.email,
                      access_token:res.data.access_token
                  };
                  const appState={
                      isLoggedIn:true,
                      user:userData,
                  };
                  props.AuthStore.saveToken(JSON.stringify(appState));
                  props.history.push('/');
                  // location.reload();
                  alert('Kayıt Tamamlandı')
              }
              else{
               alert('Giriş Yapılamadı')
              }
           })
           .catch(error=>{
              if (error.response){
                  let err=error.response.data;
                  setErrors(err.errors);
               //   alert('err.errors')

              }
              else if(error.request){
                  let err=error.request;
                  setError(err);
              }
              else{
                  setError(error.message)
                  alert(err.message)
              }
           });
    }
    let arr=[];
    Object.values(errors).forEach(value =>{
        arr.push(value)
    });
    return  (
        <div className="login-register-container">
            <div className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt=""
                     width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Hemen Kayıt Ol</h1>
                {arr.length !=0 && arr.map((item)=>(<p>{item}</p>))}
                {error !='' && (<p>{error}</p>)}

                <Formik initialValues={{
                       name:'',
                       email:'',
                       password:'',
                       password_confirmation:'',
                }}
                onSubmit={handleSubmit}
                validationSchema={
                       Yup.object().shape({ //zorunlu alanları oluşturmak için yup kullanıyoruz
                       email:Yup
                           .string()
                           .email('EMail Formatı Hatalı')
                           .required('EMail Zorunludur'),
                       name:Yup.string().required('Ad Soyad Zorunludur'),
                       password:Yup.string().required('Şifre Zorunludur'),
                       password_confirmation:Yup.string().oneOf([Yup.ref('password'),null],'Şifreler EŞleşmiyor')
                    })
                }>
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        errors,
                        isValid,
                        isSubmitting,
                        touched
                    })=>(
                 <div>
                <div className="form-group">
                    <label htmlFor="inputName" className="sr-only">Ad-Soyad</label>
                    <input id="inputName" type="text"  className="form-control" required="" autoFocus=""
                           onBlur={handleBlur}
                           placeholder="Ad Soyad Giriniz"
                           value={values.name}
                           onChange={handleChange('name')}
                    />
                    {(errors.name && touched.name) && <p>{errors.name}</p>}
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail" className="sr-only">Email Adres</label>
                <input type="email" className="form-control"
                       placeholder="Email Adresi Giriniz"
                       value={values.email}
                       onChange={handleChange('email')}
                      />
                    {(errors.email && touched.email) && <p>{errors.email}</p>}

                </div>
                <div className="form-group">
                <label htmlFor="inputPassword" className="sr-only">Şifre</label>
                <input type="password"
                       className="form-control"
                       placeholder="Şifre Giriniz"
                       value={values.password}
                       onChange={handleChange('password')}
                       />
                    {(errors.password && touched.password) && <p>{errors.password}</p>}

                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Şifre Tekrarı</label>
                    <input type="password"
                           className="form-control"
                           placeholder="Tekrar Şifreyi Giriniz"
                           value={values.password_confirmation}
                           onChange={handleChange('password_confirmation')}
                         />
                    {(errors.password_confirmation && touched.password_confirmation) && <p>{errors.password_confirmation}</p>}

                </div>
                <button
                        disabled={!isValid || isSubmitting}
                        onClick={handleSubmit}
                        className="btn btn-lg btn-primary btn-block"
                        type="button">
                        Kayıt Ol</button>
                 </div>
                    )}
                </Formik>
                <Link className="mt-3" style={{display:'block'}} to="/login">Giriş</Link>
                <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </div>
        </div>
    )
};
export default inject("AuthStore")(observer(Register));
