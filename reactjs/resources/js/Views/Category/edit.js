import React, {useEffect, useState} from 'react';
import {inject,observer} from 'mobx-react';
import Layout from "../../Components/Layout/front.layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/form/CustomInput";
import Select from 'react-select';
import swal from 'sweetalert';

const Edit = (props) =>{
    const {params}=props.match;
    const [loading,setLoading]=useState(true);
    const [category,setCategory]=useState({});

    useEffect(()=>{
        axios.get(`/api/category/${params.id}/edit`,{
            headers:{
                Authorization:'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res)=>{
            if (res.data.success){
                setCategory(res.data.category);
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
        data.append('_method','put');
        const config={
            headers:{
                'Accept':'application/json',
                'content-type':'multipart/form-data',
                'Authorization':'Bearer ' + props.AuthStore.appState.user.access_token

            }
        }
        axios.post(`/api/category/${category.id}`,data,config)
            .then((res)=>{
                if(res.data.succes){
                   swal("İşem Tamamlandı");
                   setSubmitting(false);
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
                            name:category.name,

                        }}
                        onSubmit={handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                name:Yup.string().required('Kategori Adı Zorunludur'),
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
                                    Kategori Düzenle
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
