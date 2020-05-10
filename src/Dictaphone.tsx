import { Button, Col, Row, Typography } from 'antd';
import React, { useState } from 'react';
import SpeechRecognition from 'react-speech-recognition';

interface Props {
  transcript: string;
  startListening: any;
  stopListening: any;
  resetTranscript: any;
  browserSupportsSpeechRecognition?: boolean;
}

const Dictaphone: React.FunctionComponent<Props> = ({
  transcript,
  startListening,
  stopListening,
  resetTranscript,
  browserSupportsSpeechRecognition: isBrowserSupported,
}) => {
  const [isRecord, setIsRecord] = useState(false);
  console.log({ transcript, isBrowserSupported });

  const { Paragraph } = Typography;

  if (!isBrowserSupported) {
    return null;
  }

  return (
    <>
      <Row
        style={{
          paddingLeft: '8px',
          paddingRight: '8px',
          marginBottom: '8px',
        }}>
        <Col span={12}>
          {isRecord ? (
            <Button
              size="large"
              onClick={(event) => {
                stopListening(event);
                setIsRecord((prevValue) => !prevValue);
              }}
              block>
              Stop
            </Button>
          ) : (
            <Button
              size="large"
              onClick={(event) => {
                startListening(event);
                setIsRecord((prevValue) => !prevValue);
              }}
              block>
              Rec
            </Button>
          )}
        </Col>
        <Col span={12}>
          <Button
            size="large"
            onClick={(event) => {
              setIsRecord(false);
              resetTranscript(event);
            }}
            block>
            Reset
          </Button>
        </Col>
      </Row>
      <Row
        style={{
          paddingLeft: '8px',
          paddingRight: '8px',
          marginBottom: '8px',
        }}>
        <Paragraph>{transcript}</Paragraph>
      </Row>
    </>
  );
};

export default SpeechRecognition({ autoStart: false, continuous: false })(
  Dictaphone,
);
