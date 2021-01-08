import React, { useEffect, useState } from 'react';
import './RiotMatchForm.css';
import { Form, Button, Select, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MatchProps } from "./RiotMatchLoader"

const tailLayout = {
  wrapperCol: { offset: 0, span: 0},
};

type RiotMatchFormProps = {
  onRequestMatch: (match: MatchProps) => void;
};


function RiotMatchForm({ onRequestMatch }: RiotMatchFormProps) {
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();
  
  const onFinish = (values: MatchProps) => {
    console.log('Received values of form:', values);
    onRequestMatch(values);
    formRef.current.resetFields();
  };

  const onReset = () => {
    formRef.current.resetFields();
  };
  
  return (
    <div className="RiotMatchForm">
      <Form ref={formRef}form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="MatchId"
          name={'matchId'}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} style={{ margin: '0 8px' }}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RiotMatchForm;