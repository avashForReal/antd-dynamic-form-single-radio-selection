import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, Space } from "antd";
import { useForm } from "antd/lib/form/Form";

const mock = [
  { branch_name: '', is_main: true },
]

const App: React.FC = () => {

  const [branchForm] = useForm();
  const [init] = useState(mock);

  const logBranches = (text: string) => {
    const { branches } = branchForm.getFieldsValue()
    console.log(text, branches);
  }

  const isMainBranch = (name: number) => {
    const { branches } = branchForm.getFieldsValue()
    if(branches){
      if(!branches[name]?.is_main) return false
      return true
    }
  }

  const handleBranchChange = (name: number) => {
    const { branches } = branchForm.getFieldsValue()
    branches.forEach((branch: any, i: any) => {
      if (i !== name) {
        Object.assign(branch, { is_main: false })
      } else {
        Object.assign(branch, { is_main: true })
      }
    })
    branchForm.setFieldsValue({ branches });
  }

  const onFinish = (values: any) => { console.log("Received values of form:", values) };


  return (
    <Form form={branchForm} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List
        name="branches"
        initialValue={init}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              return (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "branch_name"]}
                    rules={[{ required: true, message: "Missing branch name" }]}
                  >
                    <Input placeholder="Branch name" />
                  </Form.Item>

                  <Form.Item
                    label='main or Not'
                    name={[name, 'is_main']}
                  >
                    <Radio className="form-check-input" checked={isMainBranch(name)} onChange={() => handleBranchChange(name)} name="main_branch_input" type="checkbox" id={`${key}`} />
                  </Form.Item>
                  {
                    !isMainBranch(name) ? (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    ) : null
                  }
                </Space>
              )
            })
            }
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
