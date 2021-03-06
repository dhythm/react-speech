import {
  CaretRightOutlined,
  DownloadOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import './VoiceRecorder.css';

interface Props {}

const VoiceRecorder: React.FunctionComponent<Props> = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [url, setUrl] = useState('');

  return (
    <>
      <ReactMic
        record={isRecord}
        pause={!isRecord}
        visualSetting="sinewave" // sinewave or frequencyBar
        className={'class-name'}
        onStop={(data) => {
          console.log({ data });
          setUrl(data.blobURL);
        }}
        // onData={(data) => console.log({ data })}
        // onBlock={() => console.log()}
        strokeColor="#FF4081"
        backgroundColor="#FFFFFF"
        mimeType="audio/webm" // "audio/webm", "audio/wav", "audio/mp3"
        // echoCancellation={false}
        // autoGainControl={false}
        // noiseSuppression={false}
        // channelCount={2}
        // bitRate={128000}
        // sampleRate={44100}
        // timeSlice={4000}
      />
      <Row style={{ marginTop: '8px', marginBottom: '8px' }}>
        <Col span={24}>
          <Space>
            {isRecord ? (
              <Button
                type="ghost"
                size="large"
                shape="circle"
                icon={<PauseOutlined />}
                onClick={() => setIsRecord((prev) => !prev)}
              />
            ) : (
              <Button
                type="primary"
                size="large"
                shape="circle"
                icon={<CaretRightOutlined />}
                onClick={() => {
                  setUrl('');
                  setIsRecord((prev) => !prev);
                }}
              />
            )}
            <Button
              size="large"
              onClick={() => setIsRecord((prev) => !prev)}
              icon={<DownloadOutlined />}
              disabled={!url}
              href={url}
              download
              block
            />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default VoiceRecorder;
