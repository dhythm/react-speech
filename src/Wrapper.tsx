import { Col, Row } from 'antd';
import React from 'react';

const Wrapper: React.FunctionComponent = ({ children }) => (
  <Row style={{ paddingLeft: '8px', paddingRight: '8px', marginBottom: '8px' }}>
    <Col span={24}>{children}</Col>
  </Row>
);

export default Wrapper;
