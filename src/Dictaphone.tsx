import { Button, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import SpeechRecognition from 'react-speech-recognition';

interface Props {
  continuous: boolean;
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
  continuous = true,
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
  const [context, setContext] = useState<string[]>([]);
  const { Paragraph, Text } = Typography;

  if (!isBrowserSupported) {
    return <Paragraph>Your browser does not support.</Paragraph>;
  }

  useEffect(() => {
    if (transcript !== '' && interimTranscript === '') {
      setContext(context.concat(transcript));
      resetTranscript();
    }
  }, [interimTranscript]);

  recognition.lang = 'ja';
  recognition.continuous = continuous;
  // console.log({ transcript });
  // console.log({ interimTranscript });
  // console.log({ finalTranscript });

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
              setContext([]);
            }}
            disabled={isRecording}
            block>
            Reset
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '8px' }}>
        <Col span={24}>
          <Button
            size="large"
            onClick={(event) => {}}
            disabled={context.length === 0}
            block>
            Save
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '8px' }}>
        <Col span={24} style={{ textAlign: 'left' }}>
          <Text>Transcript: </Text>
          <br />
          {transcript}
        </Col>
      </Row>
      <Row style={{ marginTop: '8px' }}>
        <Col span={24} style={{ textAlign: 'left' }}>
          <Text>Output: </Text>
          <br />
          {context.map((t, i) => (
            <React.Fragment key={i}>
              <Text>{t}</Text>
              <br />
            </React.Fragment>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default SpeechRecognition({ autoStart: false })(Dictaphone);
