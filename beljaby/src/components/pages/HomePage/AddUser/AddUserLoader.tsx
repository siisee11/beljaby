import React from 'react';
import AddUserForm from './AddUserForm';

import axios from '../../../../axios'
import { message } from 'antd';

function AddUserLoader() {
  const onSubmitSummoner = (summoners: object) => {
    axios.post(`/new/summoners`, summoners).then((res) => {
      message.success('Summoner added.')
    }).catch((e)=> {
      message.error('Failed.')
    })
  };

  return (
    <>
      <AddUserForm onSubmitSummoner={onSubmitSummoner} />
    </>
  );
}

export default AddUserLoader;