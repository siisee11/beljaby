import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../modules';
import RiotUsernameForm from './RiotUsernameForm';
import RiotProfileInfo from './RiotProfileInfo';
import { getUserProfileThunk } from '../../../../modules/riot';

function RiotProfileLoader() {
  const { data, loading, error } = useSelector((state: RootState) => state.riot.userProfile);
  const dispatch = useDispatch();

  const onSubmitUsername = (username: string) => {
    dispatch(getUserProfileThunk(username));
  };

  return (
    <>
      <RiotUsernameForm onSubmitUsername={onSubmitUsername} />
      {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      {error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
      {data && <RiotProfileInfo name={data.name} level={data.summonerLevel} id={data.id} accountId={data.accountId} profileIconId={data.profileIconId}/>}
    </>
  );
}

export default RiotProfileLoader;