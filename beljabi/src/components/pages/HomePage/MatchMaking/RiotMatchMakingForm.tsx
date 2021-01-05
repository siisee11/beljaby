import React, { useEffect, useState } from 'react';
import './RiotMatchMakingForm.css';
import { Form, Button, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import { getSummonerList} from '../../../../api/beljabi'

type RiotMatchMakingFormProps = {
  onSubmitMatchMaking: (match: object) => void;
};

type UserListItem = {
    summonerId: string,
    summonerName: string,
}

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 4, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};


function RiotMatchMakingForm({ onSubmitMatchMaking }: RiotMatchMakingFormProps) {
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();
  const [ users, setUsers ] = useState(null)
  
  useEffect(() => {
      getSummonerList().then( (res) => {
        var summonerNameList = [];
        res.ferEach((u : UserListItem) => {
          summonerNameList.push(u.summonerName)
        })
        setUsers(summonerNameList)
      }) 
  }, [])


  const onFinish = (values: object) => {
    console.log('Received values of form:', values);
    onSubmitMatchMaking(values);
  };
 
  return (
    <Form ref={formRef} form={form} name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length !== 10) {
                return Promise.reject(new Error('Need 10 summoners'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Summoners' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input summoners name",
                    },
                  ]}
                  noStyle
                >
                  <Select style={{ width: 130 }}>
                    {(users).map((item: string) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            {
              fields.length < 10 ? (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    Add Summoner 
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              ) : null
            }
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

  )
}

export default RiotMatchMakingForm;