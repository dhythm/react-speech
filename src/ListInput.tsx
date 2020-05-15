import {
  CloseOutlined,
  PlusCircleOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Button, Col, Input, Row, Typography } from 'antd';
import React, { useState } from 'react';

interface Props {
  values: string[];
  placeholder: string;
  onClick: (newValues) => void;
  selected?: string;
  onSelect?: (selected) => void;
  disableDelete?: boolean;
}

const ListInput: React.FunctionComponent<Props> = ({
  values,
  placeholder,
  onClick,
  selected,
  onSelect,
  disableDelete,
}) => {
  const [value, setValue] = useState('');
  const { Text } = Typography;

  return (
    <>
      <Row gutter={8} justify="space-between">
        <Col flex={1}>
          <Input
            value={value}
            placeholder={placeholder}
            size="large"
            onChange={(event) => setValue(event.target.value)}
          />
        </Col>
        <Col>
          <Button
            size="large"
            disabled={!value}
            onClick={() => {
              onClick(values.concat(value));
              setValue('');
            }}
            icon={<PlusCircleOutlined />}
          />
        </Col>
      </Row>
      {values.length > 0 && (
        <Col style={{ padding: '8px', paddingBottom: '0px' }}>
          {values.map((v, i) => (
            <Row key={i} gutter={4} justify="space-between">
              <Col flex={1} style={{ textAlign: 'left' }}>
                <Text>{v}</Text>
              </Col>
              <Col>
                <Button
                  danger={v === selected}
                  size="small"
                  shape="circle"
                  onClick={() => {
                    if (!onSelect) return;
                    onSelect(v !== selected ? v : '');
                  }}
                  icon={<SoundOutlined />}
                />
              </Col>
              <Col>
                <Button
                  size="small"
                  shape="circle"
                  disabled={disableDelete || v === selected}
                  onClick={() => onClick(values.filter((_, _i) => i !== _i))}
                  icon={<CloseOutlined />}
                />
              </Col>
            </Row>
          ))}
        </Col>
      )}
    </>
  );
};

export default ListInput;
