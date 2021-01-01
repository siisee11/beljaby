import React, { FormEvent, useState, ChangeEvent } from 'react';
import './RiotUsernameForm.css';

type RiotUsernameFormProps = {
  onSubmitUsername: (username: string) => void;
};

function RiotUsernameForm({ onSubmitUsername }: RiotUsernameFormProps) {
  const [input, setInput] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitUsername(input);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form className="RiotUsernameForm" onSubmit={onSubmit}>
      <input onChange={onChange} value={input} placeholder="Riot 계정명을 입력하세요." />
      <button type="submit">조회</button>
    </form>
  );
}

export default RiotUsernameForm;