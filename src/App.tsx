import { Button, Layout, Row, Typography } from 'antd';
import React, { useState } from 'react';
import './App.css';
import Dictaphone from './Dictaphone';

const App: React.FunctionComponent = () => {
  const [isRecord, setIsRecord] = useState(false);
  const { Title } = Typography;

  return (
    <div className="App">
      <Layout style={{ textAlign: 'center' }}>
        <Row style={{ padding: '8px' }}>
          <Title level={3}>react-speech</Title>
          <Button onClick={() => setIsRecord((prevState) => !prevState)} block>
            {isRecord ? 'stop' : 'rec'}
          </Button>
          {isRecord && <Dictaphone />}
        </Row>
      </Layout>
    </div>
  );
};

export default App;
