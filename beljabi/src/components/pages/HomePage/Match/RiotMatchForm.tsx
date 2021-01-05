import React, { useEffect, useState } from 'react';
import './RiotMatchForm.css';
import { Form, InputNumber, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import { getSummonerList } from '../../../../api/beljabi'

type RiotMatchFormProps = {
  onSubmitMatch: (match: object) => void;
};

const { Option } = Select;

const teams= ['Win', 'Defeat'];
const position = ['TOP', 'JG', 'MID', 'ADC', 'SUP'];

const tailLayout = {
  wrapperCol: { offset: 0, span: 0},
};

type UserListItem = {
    summonerId: string,
    summonerName: string,
}

function RiotMatchForm({ onSubmitMatch }: RiotMatchFormProps) {
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();
  const [ users, setUsers ] = useState(null)
  
  useEffect(() => {
      getSummonerList().then( (res) => {
        var summonerNameList = [];
        res.forEach((u : UserListItem) => {
          summonerNameList.push(u.summonerName)
        })
        setUsers(summonerNameList)
      }) 
  }, [])

  const onFinish = (values: object) => {
    console.log('Received values of form:', values);
    onSubmitMatch(values);
    formRef.current.resetFields();
  };

  const onReset = () => {
    formRef.current.resetFields();
  };
  
  return (
    <Form ref={formRef}form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="player">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  label="Team"
                  name={[field.name, 'team']}
                  fieldKey={[field.fieldKey, 'team']}
                  rules={[{ required: true, message: 'Missing team' }]}
                >
                  <Select style={{ width: 130 }}>
                    {(teams).map(item => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.team !== curValues.team || prevValues.position !== curValues.posision
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Position"
                      name={[field.name, 'position']}
                      fieldKey={[field.fieldKey, 'position']}
                      rules={[{ required: true, message: 'Missing Position' }]}
                    >
                      <Select style={{ width: 130 }}>
                        {(position).map(item => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Name"
                  name={[field.name, 'name']}
                  fieldKey={[field.fieldKey, 'name']}
                  rules={[{ required: true, message: 'Missing name' }]}
                >
                  <Select style={{ width: 130 }}>
                    {users && (users).map((item: string) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Kill"
                  name={[field.name, 'kill']}
                  fieldKey={[field.fieldKey, 'kill']}
                  rules={[{ required: true, message: 'Missing kill' }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Death"
                  name={[field.name, 'death']}
                  fieldKey={[field.fieldKey, 'death']}
                  rules={[{ required: true, message: 'Missing death' }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Assist"
                  name={[field.name, 'assist']}
                  fieldKey={[field.fieldKey, 'assist']}
                  rules={[{ required: true, message: 'Missing assist' }]}
                >
                  <InputNumber />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            {
              fields.length < 10 ? (
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Player
                  </Button>
                </Form.Item>
              ) : null
            }
          </>
        )}
      </Form.List>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset} style={{ margin: '0 8px' }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RiotMatchForm;