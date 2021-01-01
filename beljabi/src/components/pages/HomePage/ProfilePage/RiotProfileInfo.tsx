import React from 'react';
import './RiotProfileInfo.css';

type RiotProfileInfoProps = {
  name: string;
  level: number;
  profileIconId: number;
  accountId : string;
  id: string;
};

function RiotProfileInfo({ name, profileIconId, level, id, accountId }: RiotProfileInfoProps) {
  return (
    <div className="GithubProfileInfo">
      <div className="profile-head">
        <div className="name">{name}</div>
      </div>
      <p>level : {level}</p>
      <p>AID   : {accountId}</p>
      <p>SID   : {id}</p>
    </div>
  );
}

export default RiotProfileInfo;