import React  from 'react';
import './AddUserForm.css';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

type AddUserFormProps = {
  onSubmitSummoner: (summoner: object) => void;
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 0},
};

function AddUserForm({ onSubmitSummoner }: AddUserFormProps) {
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();
  
  const onFinish = (values: object) => {
    console.log('Received values of form:', values);
    onSubmitSummoner(values);
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
                  label="Name"
                  name={[field.name, 'name']}
                  fieldKey={[field.fieldKey, 'name']}
                  rules={[{ required: true, message: 'Missing name' }]}
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Summoner
              </Button>
            </Form.Item>
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

export default AddUserForm;