import React, {useEffect, useState} from 'react';
import {inject,observer} from 'mobx-react';
import Layout from "../../Components/Layout/front.layout";
import {Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/form/CustomInput";
import Select from 'react-select';
import swal from 'sweetalert';

const Create = (props) =>{

    const [categories,setCategories]=useState([]);
    const [property,setProperty]=useState([]);
    useEffect(()=>{
        console.log(props.AuthStore.appState.user.access_token);
        axios.get(`/api/product/create`,{
            headers:{
                Authorization:'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res)=>{
             setCategories(res.data.categories);
        }).catch(e=>console.log(e));
    },[])
    const handleSubmit=(values,{resetForm})=>{
          const data=new FormData();
          data.append('categoryId',values.categoryId);
          data.append('name',values.name);
          data.append('modelCode',values.modelCode);
          data.append('barcode',values.barcode);
          data.append('brand',values.brand);
          data.append('tax',values.tax);
          data.append('stock',values.stock);
          data.append('text',values.text);
          data.append('sellingPrice',values.sellingPrice);
          data.append('buyingPrice',values.buyingPrice);
          data.append('property',JSON.stringify(property));

          const config={
             headers:{
                 'Accept':'application/json',
                 'content-type':'multipart/form-data',
                 'Authorization':'Bearer ' + props.AuthStore.appState.user.access_token

    }
          }
          axios.post('/api/product',data,config)
              .then((res)=>{
               if(res.data.succes){
                   resetForm({});
                   setProperty([]);
               }
               else{
                     swal(res.data.message);
               }
              })
              .catch(e => console.log(e));
    };
    const newProperty = () =>{
        setProperty([...property,{property:'',value:''}]);
    };
    const removeProperty=(index)=>{
        const OldProperty=property;
        OldProperty.splice(index,1);
        setProperty([...OldProperty]);
    };

    const changeTextInput = (event,index) => {
        console.log(property);
        console.log(event.target.value,index);
        property[index][event.target.name] = event.target.value;
        setProperty([...property]);
    };
    return  (
        <Layout>
            <div className="mt-5">
            <div className="container">
            <Formik
                initialValues={{
                    categoryId:'',
                    name:'',
                    modelCode:'',
                    brand:'',
                    stock:0,
                    tax:0,
                    buyingPrice:'',
                    sellingPrice:'',
                    text:'',
                    barcode:''
                }}
                onSubmit={handleSubmit}
                validationSchema={
                    Yup.object().shape({
                     categoryId:Yup.number().required('Kategori Seçimi Zorunludur'),
                        name:Yup.string().required('Ürün Adı Zorunludur'),
                        modelCode:Yup.string().required('Ürün Model Kodu Zorunludur'),
                        barcode:Yup.string().required('Ürün Barkodu Zorunludur'),
                        brand:Yup.string().required('Ürün MArkası Zorunludur'),
                        buyingPrice:Yup.number().required('Ürün Alış Fiyatı Zorunludur'),
                        sellingPrice:Yup.number().required('Ürün Satış Fiyatı Zorunludur'),

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
                                onChange={(e) => setFieldValue('categoryId',e.id)}
                                placeholder={"Ürün Kategorisi Seçiniz"}
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id}
                                options={categories} />
                            </div>
                            {(errors.categoryId && touched.categoryId) && <p className="form-error">{errors.categoryId}</p>}

                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                            <CustomInput
                            title="Ürün Adı"
                            value={values.name}
                            handleChange={handleChange('name')}
                            />
                            {(errors.name && touched.name) && <p className="form-error">{errors.name}</p>}

                        </div>
                        <div className="col-md-6">
                            <CustomInput
                                title="Ürün Model Kodu"
                                value={values.modelCode}
                                handleChange={handleChange('modelCode')}
                            />
                            {(errors.modelCode && touched.modelCode) && <p className="form-error">{errors.modelCode}</p>}

                        </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title="Barkod"
                                    value={values.barcode}
                                    handleChange={handleChange('barcode')}
                                />
                                {(errors.barcode && touched.barcode) && <p className="form-error">{errors.barcode}</p>}

                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title="Marka"
                                    value={values.brand}
                                    handleChange={handleChange('brand')}
                                />
                                {(errors.brand && touched.brand) && <p className="form-error">{errors.brand}</p>}

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title="Stok"
                                    value={values.stock}
                                    type="number"
                                    handleChange={handleChange('stock')}
                                />
                                {(errors.stock && touched.stock) && <p className="form-error">{errors.stock}</p>}

                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title="KDV"
                                    value={values.tax}
                                    handleChange={handleChange('tax')}
                                />
                                {(errors.tax && touched.tax) && <p className="form-error">{errors.tax}</p>}

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    title="Alış Fiyatı"
                                    value={values.buyingPrice}
                                    type="number"
                                    handleChange={handleChange('buyingPrice')}
                                />
                                {(errors.buyingPrice && touched.buyingPrice) && <p className="form-error">{errors.buyingPrice}</p>}

                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    title="Satış Fiyatı"
                                    value={values.sellingPrice}
                                    type="number"
                                    handleChange={handleChange('sellingPrice')}
                                />
                                {(errors.sellingPrice && touched.sellingPrice) && <p className="form-error">{errors.sellingPrice}</p>}

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
                        </div>
                        <div className="row mb-3 mt-3">
                            <div className="col-md-12">
                                <button type="button" onClick={newProperty} className="btn btn-primary">Yeni Özellik</button>
                            </div>
                        </div>
                        {
                            property.map((item,index)=>(
                                <div className="row mb-1">
                                    <div className="col-md-5">
                                        <label>Özellik Adı:</label>
                                        <input type="text" className="form-control" name="property" onChange={(event) => changeTextInput(event,index)} value={item.property}/>
                                    </div>
                                    <div className="col-md-5">
                                        <label>Özellik Değeri:</label>
                                        <input type="text" className="form-control" name="value" onChange={(event) => changeTextInput(event,index)} value={item.value}/>
                                    </div>
                                     <div style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}} className="col-md-1">
                                        <button onClick={()=> removeProperty(index)}  type="button" className="btn btn-danger">X</button>
                                    </div>

                                </div>
                            ))
                        }
                        <button
                            disabled={!isValid || isSubmitting}
                            onClick={handleSubmit}
                            className="btn btn-lg mt-3 col-md-12 btn-primary btn-block"
                            type="button">
                             Ürünü Ekle
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
