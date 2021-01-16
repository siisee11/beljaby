import React from 'react';
import { useSelector } from 'react-redux'
import './JoinForm.css';
import { Button } from 'antd';
import { RootState } from "../../../../modules"


type JoinFormProps = {
  onSubmitJoin: (summoner: string) => void;
};

function JoinForm({ onSubmitJoin }: JoinFormProps) {
  const { data } = useSelector((state: RootState) => state.beljabi.userProfile);

  const onJoin = () => {
    onSubmitJoin(data.summoner);
  };
 
  return (
    <div className="JoinForm">
    {
      data && (
        <Button type="primary" onClick={onJoin}>
          JOIN! 
        </Button>
      )
    }
    </div>
  )
}

export default JoinForm;