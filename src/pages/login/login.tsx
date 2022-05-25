import { Form, Input, Button } from 'antd';
import { useLoginEffect } from '@/effect';

export default function Login() {
  const { paramsTenantTaxNo, loading, onFinish, onFinishFailed } = useLoginEffect();

  return (
    <div style={{ paddingTop: 160, paddingRight: 100 }}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {!paramsTenantTaxNo && <Form.Item label="TenantCode" name="tenant_tax_no"  rules={[{ required: true, message: 'Please input your TenantCode' }]}>
          <Input />
        </Form.Item>}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
