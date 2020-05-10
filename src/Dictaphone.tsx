import { Button, Row, Typography } from 'antd';
import React from 'react';
import SpeechRecognition from 'react-speech-recognition';

interface Props {
  transcript: string;
  resetTranscript: () => void;
  browserSupportsSpeechRecognition?: boolean;
}

const Dictaphone: React.FunctionComponent<Props> = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition: isBrowserSupported,
}) => {
  console.log({ transcript, isBrowserSupported });

  const { Paragraph } = Typography;

  if (!isBrowserSupported) {
    return null;
  }

  return (
    <>
      <Button onClick={resetTranscript} block>
        Reset
      </Button>
      <Row style={{ paddingTop: '8px' }}>
        <Paragraph>{transcript}</Paragraph>
      </Row>
    </>
  );
};

export default SpeechRecognition(Dictaphone);
