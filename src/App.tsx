import { DownloadOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Input,
  Layout,
  Row,
  TimePicker,
  Typography,
} from 'antd';
import { Form, Formik } from 'formik';
import { DateTime } from 'luxon';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import './App.css';
import Dictaphone from './Dictaphone';
import ListInput from './ListInput';
import { initialValues, validationSchema } from './schema';
import VoiceRecorder from './VoiceRecorder';
import Wrapper from './Wrapper';

const App: React.FunctionComponent = () => {
  const [url, setUrl] = useState('');
  const [speaker, setSpeaker] = useState('');
  const ref = useRef() as React.MutableRefObject<any>;

  const { Title } = Typography;
  const { RangePicker } = TimePicker;
  const now = DateTime.local().startOf('hours');
  const dateFormat = 'yyyy-MM-dd';
  const timeFormat = 'HH:mm';

  return (
    <div className="App">
      <Layout style={{ textAlign: 'center' }}>
        <Row style={{ marginBottom: '8px' }} />
        <Wrapper>
          <Title level={3}>react-speech</Title>
        </Wrapper>
        <Formik
          initialValues={{
            ...initialValues,
            date: moment(now.toFormat(dateFormat), dateFormat.toUpperCase()),
            timeRange: [
              moment(now.toFormat(timeFormat), timeFormat),
              moment(now.plus({ hours: 1 }).toFormat(timeFormat), timeFormat),
            ] as [moment.Moment, moment.Moment],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { title, date, timeRange, participants, context } = values;
            console.log({ values });

            const timeRangeStrings = timeRange.map((v) =>
              DateTime.fromJSDate(v.toDate()).toFormat('HH:mm'),
            );
            const file = new Blob(
              [
                `Title: ${title}`,
                `\n`,
                `Datetime: ${DateTime.fromJSDate(date.toDate()).toFormat(
                  'yyyy/MM/dd',
                )} ${timeRangeStrings[0]}-${timeRangeStrings[1]}`,
                `\n`,
                `Participants: ${participants.join(', ')}`,
                `\n`,
                `Details:`,
                `\n`,
                context,
              ],
              {
                type: 'text/plain',
              },
            );

            setUrl(URL.createObjectURL(file));

            setSubmitting(false);
            ref.current.click();
          }}>
          {(formikProps) => {
            const { values, setFieldValue, handleSubmit } = formikProps;
            return (
              <Form>
                <Wrapper>
                  <Input
                    placeholder="Title"
                    size="large"
                    value={values.title}
                    onChange={(value) => setFieldValue('title', value)}
                  />
                </Wrapper>
                <Wrapper>
                  <DatePicker
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(date, dateString) => {
                      setFieldValue('date', date);
                    }}
                    value={values.date}
                  />
                </Wrapper>
                <Wrapper>
                  <RangePicker
                    picker="time"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(values) => {
                      setFieldValue('timeRange', values);
                    }}
                    format={timeFormat}
                    value={values.timeRange}
                  />
                </Wrapper>
                <Wrapper>
                  <ListInput
                    placeholder="Participants"
                    values={values.participants}
                    onClick={(value) => setFieldValue('participants', value)}
                    selected={speaker}
                    onSelect={setSpeaker}
                  />
                </Wrapper>
                <Wrapper>
                  <Input
                    placeholder="Filename"
                    size="large"
                    value={values.fileName}
                    onChange={(value) => setFieldValue('fileName', value)}
                  />
                </Wrapper>

                <Wrapper>
                  <Button
                    ref={ref}
                    style={{ display: 'none' }}
                    size="large"
                    onClick={() => {}}
                    icon={<DownloadOutlined />}
                    disabled={!url}
                    href={url}
                    download={values.fileName}
                    block>
                    Download
                  </Button>
                </Wrapper>

                <Wrapper>
                  <Dictaphone
                    speaker={speaker}
                    handleSubmit={(value) => {
                      setFieldValue('context', value.join('\n'));
                      console.log({ value });
                      handleSubmit();
                    }}
                  />
                </Wrapper>

                {process.env.NODE_ENV === 'development' && (
                  <Wrapper>
                    <VoiceRecorder />
                  </Wrapper>
                )}
              </Form>
            );
          }}
        </Formik>
      </Layout>
    </div>
  );
};

export default App;
