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
        const data=new FormData();
        data.append('name',values.name);
        const config={
            headers:{
                'Accept':'application/json',
                'content-type':'multipart/form-data',
                'Authorization':'Bearer ' + props.AuthStore.appState.user.access_token

            }
        }
        axios.post('/api/category',data,config)
            .then((res)=>{
                if(res.data.succes){
                    swal("Kategori Eklendi");
                    resetForm({});
                }
                else{
                    swal(res.data.message);
                }
            })
            .catch(e => console.log(e));
    };
    return  (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <Formik
                        initialValues={{
                            name:'',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                name:Yup.string().required('Kategrori Adı Zorunludur'),
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
                                        <CustomInput
                                            title="Kategori Adı"
                                            value={values.name}
                                            handleChange={handleChange('name')}
                                        />
                                        {(errors.name && touched.name) && <p className="form-error">{errors.name}</p>}

                                    </div>
                                </div>
                                <button
                                    disabled={!isValid || isSubmitting}
                                    onClick={handleSubmit}
                                    className="btn btn-lg mt-3 col-md-12 btn-primary btn-block"
                                    type="button">
                                    Kategori Ekle
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
