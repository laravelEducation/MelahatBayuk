import React from 'react';
import {inject,observer} from 'mobx-react';
import Layout from "../../Components/Layout/front.layout";

const Index = (props) =>{
    props.AuthStore.getToken();

  return  (
      <Layout>
          <div>Burası Index </div>
      </Layout>
  )
};
export default inject("AuthStore")(observer(Index));
