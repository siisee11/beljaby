import React  from 'react';
import './TottoResultForm.css';
import { Typography, Form, Button, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { Totto } from "./TottoLoader"

type TottoResultFormProps = {
  onSubmitTottoResult: (totto: Totto) => void;
};

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { offset: 0, span: 0},
};


function TottoResultForm({ onSubmitTottoResult }: TottoResultFormProps) {
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();

  const onFinish = (values: Totto) => {
    console.log('Received values of form:', values);
    onSubmitTottoResult(values);
  };
 
  return (
    <>
    <Title level={3} style={{alignSelf:"center", margin: "10px"}}> Update Result</Title>
    <Form ref={formRef}form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="answers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  label="Answer"
                  name={[field.name, 'answer']}
                  fieldKey={[field.fieldKey, 'answer']}
                  style={{width:"800px"}}
                  rules={[{ required: true, message: 'Missing' }]}
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                 Add result
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default TottoResultForm;