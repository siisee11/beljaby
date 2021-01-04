import React from 'react';
import './RiotMatchInfo.css';

type RiotMatchInfoProps = {
  name: string;
  level: number;
  profileIconId: number;
  accountId : string;
  id: string;
};

function RiotMatchInfo({ name, profileIconId, level, id, accountId }: RiotMatchInfoProps) {
  return (
    <div className="RiotMatchInfo">
      <div className="profile-head">
        <div className="name">{name}</div>
      </div>
      <p>level : {level}</p>
      <p>AID   : {accountId}</p>
      <p>SID   : {id}</p>
    </div>
  );
}

export default RiotMatchInfo;