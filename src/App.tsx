import { DatePicker, Input, Layout, Row, TimePicker, Typography } from 'antd';
import { DateTime } from 'luxon';
import moment from 'moment';
import React from 'react';
import './App.css';
import Dictaphone from './Dictaphone';
import VoiceRecorder from './VoiceRecorder';
import Wrapper from './Wrapper';

const App: React.FunctionComponent = () => {
  const { Title } = Typography;
  const { RangePicker } = TimePicker;
  const now = DateTime.local().startOf('hours');
  const dateFormat = 'yyyy-MM-dd';
  const timeFormat = 'HH:mm';
  const hide = true;

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
            defaultValue={moment(
              now.toFormat(dateFormat),
              dateFormat.toUpperCase(),
            )}
          />
        </Wrapper>
        <Wrapper>
          <RangePicker
            picker="time"
            size="large"
            style={{ width: '100%' }}
            onChange={() => console.log('')}
            format={timeFormat}
            defaultValue={[
              moment(now.toFormat(timeFormat), timeFormat),
              moment(now.plus({ hours: 1 }).toFormat(timeFormat), timeFormat),
            ]}
          />
        </Wrapper>
        <Wrapper>
          <Input placeholder="Participants" size="large" />
        </Wrapper>

        <Wrapper>
          <Dictaphone />
        </Wrapper>

        {process.env.NODE_ENV === 'development' && !hide && (
          <Wrapper>
            <VoiceRecorder />
          </Wrapper>
        )}
      </Layout>
    </div>
  );
};

export default App;
