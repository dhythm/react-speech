import { Layout, Row, Typography } from 'antd';
import React from 'react';
import './App.css';
import Dictaphone from './Dictaphone';

const App: React.FunctionComponent = () => {
  const { Title } = Typography;

  return (
    <div className="App">
      <Layout style={{ textAlign: 'center' }}>
        <Row style={{ padding: '8px' }}>
          <Title level={3}>react-speech</Title>
          <Dictaphone />
        </Row>
      </Layout>
    </div>
  );
};

export default App;
