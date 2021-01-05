import React from 'react';
import RiotMatchForm from './RiotMatchForm';

import axios from '../../../../axios'
import { message } from 'antd';

function RiotMatchLoader() {
  const onSubmitMatch = (match: object) => {
    axios.post(`/new/match`, match).then((res) => {
      message.success('Match added.')
    })
  };

  return (
    <>
      <RiotMatchForm onSubmitMatch={onSubmitMatch} />
    </>
  );
}

export default RiotMatchLoader;