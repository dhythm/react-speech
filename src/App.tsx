import { DatePicker, Input, Layout, Row, Typography } from 'antd';
import React from 'react';
import './App.css';
import Dictaphone from './Dictaphone';
import Wrapper from './Wrapper';

const App: React.FunctionComponent = () => {
  const { Title } = Typography;

  return (
    <div className="App">
      <Layout style={{ textAlign: 'center' }}>
        <Row style={{ marginBottom: '8px' }} />
        <Wrapper>
          <Title level={3}>react-speech</Title>
        </Wrapper>
        <Wrapper>
          <Input placeholder="Title" size="large" />
        </Wrapper>
        <Wrapper>
          <DatePicker
            size="large"
            style={{ width: '100%' }}
            onChange={(date, dateString) => console.log({ date, dateString })}
          />
        </Wrapper>
        <Wrapper>
          <Input placeholder="Participants" size="large" />
        </Wrapper>

        <Dictaphone />
      </Layout>
    </div>
  );
};

export default App;
