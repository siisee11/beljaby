import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../modules';
import RiotMatchForm from './RiotMatchForm';
import RiotMatchInfo from './RiotMatchInfo';

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