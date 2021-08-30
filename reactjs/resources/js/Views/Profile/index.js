import React, {useEffect, useState} from 'react';
import {inject,observer} from 'mobx-react';
import Layout from "../../Components/Layout/front.layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/form/CustomInput";
import Select from 'react-select';
import swal from 'sweetalert';

const Edit = (props) =>{
    const [loading,setLoading]=useState(true);
   const [user,setUser]=useState([]);

    useEffect(()=>{
        axios.get(`/api/profile`,{
            headers:{
                Authorization:'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res)=>{
            if (res.data.success){
              setUser(res.data.user);
                setLoading(false);
            }
            else{
                swal(res.data.message);
            }
        }).catch(e=>console.log(e));
    },[])
    const handleSubmit=(values,{resetForm,setSubmitting})=>{
        const data=new FormData();
        data.append('name',values.name);
        data.append('email',values.email);
        data.append('password',values.password);
        data.append('_method','put');
        const config={
            headers:{
                'Accept':'application/json',
                'content-type':'multipart/form-data',
                'Authorization':'Bearer ' + props.AuthStore.appState.user.access_token

            }
        }
        axios.post(`/api/profile/${user.id}`,data,config)
            .then((res)=>{
                if(res.data.success){
                    setSubmitting(false);
                     resetForm({password: ''});
                }
                else{
                    swal(res.data.message);
                    setSubmitting(false);

                }
            })
            .catch(e => console.log(e));
    };

    if (loading) return <div>Yükleniyor</div>
    return  (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik
                        initialValues={{
                            name:user.name,
                            email:user.email,
                            password:'',

                        }}
                        onSubmit={handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                name:Yup.string().required('Ad Zorunludur'),
                                email:Yup.string().email().required('Email Zorunludur'),
                            })
                        }
                    >
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              handleBlur,
                              errors,
                              isValid,
                              setFieldValue,
                              isSubmitting,
                              touched
                          }) => (

                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Adınız Soyadınız"
                                            value={values.name}
                                            handleChange={handleChange('name')}
                                        />
                                        {(errors.name && touched.name) && <p className="form-error">{errors.name}</p>}

                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Email Adresiniz"
                                            value={values.email}
                                            handleChange={handleChange('email')}
                                        />
                                        {(errors.email && touched.email) && <p className="form-error">{errors.email}</p>}

                                    </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <CustomInput
                                            title="Şifreniz"
                                            value={values.password}
                                            handleChange={handleChange('password')}
                                        />
                                        {(errors.password && touched.password) && <p className="form-error">{errors.password}</p>}
                                    </div>
                                </div>
                                <button
                                    disabled={!isValid || isSubmitting}
                                    onClick={handleSubmit}
                                    className="btn btn-lg mt-3 col-md-12 btn-primary btn-block"
                                    type="button">
                                   Düzenle
                                </button>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
};
export default inject("AuthStore")(observer(Edit));
