import { Button, Col, Row, Typography } from 'antd';
import React, { useState } from 'react';
import SpeechRecognition from 'react-speech-recognition';

interface Props {
  transcript: string;
  interimTranscript: string;
  finalTranscript: string;
  startListening: any;
  stopListening: any;
  resetTranscript: any;
  listening: boolean;
  browserSupportsSpeechRecognition?: boolean;
  recognition?: any;
}

const Dictaphone: React.FunctionComponent<Props> = ({
  transcript,
  interimTranscript,
  finalTranscript,
  startListening,
  stopListening,
  resetTranscript,
  listening,
  browserSupportsSpeechRecognition: isBrowserSupported,
  recognition,
}) => {
  const [isRecording, setIsRecord] = useState(false);
  const { Paragraph, Text } = Typography;

  if (!isBrowserSupported) {
    return <Paragraph>Your browser does not support.</Paragraph>;
  }

  recognition.lang = 'ja';

  return (
    <>
      <Row gutter={8}>
        <Col span={12}>
          {isRecording ? (
            <Button
              size="large"
              onClick={(event) => {
                stopListening(event);
                setIsRecord(false);
              }}
              block>
              Stop
            </Button>
          ) : (
            <Button
              size="large"
              onClick={(event) => {
                startListening(event);
                setIsRecord(true);
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
              resetTranscript(event);
            }}
            disabled={isRecording}
            block>
            Reset
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '8px' }}>
        {transcript.split(' ').map((t, i) => (
          <React.Fragment key={i}>
            <Text>{t}</Text>
            <br />
          </React.Fragment>
        ))}
      </Row>
    </>
  );
};

export default SpeechRecognition({ autoStart: false, continuous: true })(
  Dictaphone,
);
