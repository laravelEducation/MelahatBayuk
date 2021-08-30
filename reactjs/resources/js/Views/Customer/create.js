import React, {useEffect, useState} from 'react';
import {inject,observer} from 'mobx-react';
import Layout from "../../Components/Layout/front.layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/form/CustomInput";
import Select from 'react-select';
import swal from 'sweetalert';

const Create = (props) =>{

    const handleSubmit=(values,{resetForm})=>{

        axios.post('/api/customer',{...values},{
            headers:{
                'Authorization':'Bearer ' + props.AuthStore.appState.user.access_token

            }
        })
            .then((res)=>{
                if(res.data.succes){
                    resetForm({});

                }
                else{
                    swal(res.data.message);

                }
            })
            .catch(e =>{
                console.log(e)});
    };

    return  (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik
                        initialValues={{
                            customerType:'',
                            name:'',
                            email:'',
                            phone:'',
                            address:0,
                            note:'',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                customerType:Yup.number().required('Hesap Seçimi Zorunludur'),
                                name:Yup.string().required('Ürün Adı Zorunludur'),
                                email:Yup.string().email().required('Email Alanı Zorunludur'),
                                phone:Yup.string().required('Telefon  Zorunludur'),

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
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Select
                                                onChange={(e) => setFieldValue('customerType',e.id)}
                                                placeholder={"Hesap Tipi Seçiniz"}
                                                getOptionLabel={option => option.name}
                                                getOptionValue={option => option.id}
                                                options={[{id:0,name:'Tedarikçi'},{id:1,name:'Müşteri'}]} />
                                        </div>
                                        {(errors.customerType && touched.customerType) && <p className="form-error">{errors.customerType}</p>}

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Hesap Adı"
                                            value={values.name}
                                            handleChange={handleChange('name')}
                                        />
                                        {(errors.name && touched.name) && <p className="form-error">{errors.name}</p>}

                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Email"
                                            value={values.email}
                                            handleChange={handleChange('email')}
                                        />
                                        {(errors.email && touched.email) && <p className="form-error">{errors.email}</p>}

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Adres"
                                            value={values.address}
                                            handleChange={handleChange('address')}
                                        />
                                        {(errors.address && touched.address) && <p className="form-error">{errors.address}</p>}

                                    </div>
                                    <div className="col-md-6">
                                        <CustomInput
                                            title="Telefon"
                                            value={values.phone}
                                            handleChange={handleChange('phone')}
                                        />
                                        {(errors.phone && touched.phone) && <p className="form-error">{errors.phone}</p>}

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <CustomInput
                                            title="Açıklama"
                                            value={values.text}
                                            type="text"
                                            handleChange={handleChange('text')}
                                        />
                                        {(errors.text && touched.text) && <p className="form-error">{errors.text}</p>}

                                    </div>
                                </div>
                                <button
                                    disabled={!isValid || isSubmitting}
                                    onClick={handleSubmit}
                                    className="btn btn-lg mt-3 col-md-12 btn-primary btn-block"
                                    type="button">
                                    Hesap Ekle
                                </button>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
};
export default inject("AuthStore")(observer(Create));
