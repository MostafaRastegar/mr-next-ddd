import { Button, Form, Input } from 'antd';
import { useLoginVM } from './login.vm';

type FieldType = {
  email: string;
  password: string;
};

export function LoginView() {
  const { isPending, onFinish } = useLoginVM();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <section className="h-full">
        <div className="w-full max-w-80">
          <div className="text-center">
            <img
              className="mx-auto w-[72px]"
              src="/logo-login.png"
              alt="logo"
            />
            <h4 className="mb-8 mt-3 pb-1 text-2xl font-semibold">
              IP Address Management
            </h4>
          </div>

          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="w-full"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full"
                type="primary"
                htmlType="submit"
                loading={isPending}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <p className="text-justify text-[13px] text-gray-600">
            IPAM (IP Address Management) is the administration of DNS and DHCP,
            which are the network services that assign and resolve IP addresses
            to machines in a TCP/IP network. Simply put, IPAM is a means of
            planning, tracking, and managing the Internet Protocol address space
            used in a network.
          </p>
          <p className="my-1 border-t py-1 text-left text-[11px] text-gray-500">
            © Copyright 2011-2024 www.****.com. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
