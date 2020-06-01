import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Typography } from 'antd';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import SpeechRecognition from 'react-speech-recognition';

interface Props {
  speaker?: string;
  continuous: boolean;
  handleSubmit: (any) => void;
  transcript: string;
  interimTranscript: string;
  finalTranscript: string;
  startListening: any;
  stopListening: any;
  abortListening: any;
  resetTranscript: any;
  listening: boolean;
  browserSupportsSpeechRecognition?: boolean;
  recognition?: any;
}

// https://github.com/FoundersFactory/react-speech-recognition/issues/11#issuecomment-470665721
const SpeechGrammarList =
  typeof window !== 'undefined' &&
  // window.SpeechGrammarList;
  (window.SpeechGrammarList ||
    (window as any).webkitSpeechGrammarList ||
    (window as any).mozSpeechGrammarList ||
    (window as any).msSpeechGrammarList ||
    (window as any).oSpeechGrammarList);

const Dictaphone: React.FunctionComponent<Props> = ({
  speaker,
  continuous = true,
  handleSubmit,
  transcript,
  interimTranscript,
  finalTranscript,
  startListening,
  stopListening,
  abortListening,
  resetTranscript,
  listening,
  browserSupportsSpeechRecognition: isBrowserSupported,
  recognition,
}) => {
  const [isRecording, setIsRecord] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [context, setContext] = useState<string[]>([]);
  const { Paragraph, Text } = Typography;
  const { TextArea } = Input;

  if (!isBrowserSupported) {
    return <Paragraph>Your browser does not support.</Paragraph>;
  }

  const dumpToContext = () => {
    if (speaker) {
      setContext(
        context.concat(
          `(${speaker} ${DateTime.local().toFormat('HH:mm')}) ${transcript}`,
        ),
      );
    } else {
      setContext(
        context.concat(
          `(Anonymous ${DateTime.local().toFormat('HH:mm')}) ${transcript}`,
        ),
      );
    }
    resetTranscript();
  };

  useEffect(() => {
    // transcript will equal to finalTranscript and interimTranscript will be empty after recording.
    if (transcript !== '' && interimTranscript === '') {
      dumpToContext();
    }
  }, [interimTranscript]);

  useEffect(() => {}, [isRecording]);

  const grammarNumber = `#JSGF V1.0 JIS ja; grammar numbers; public <numbers> = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 ;`;
  const units = ['キロ', 'センチ', 'ミリ'];
  const grammarUnit = `#JSGF V1.0 JIS ja; grammar units; public <units> =  ${units.join(
    '|',
  )};`;

  if (SpeechGrammarList) {
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammarNumber, 1);
    speechRecognitionList.addFromString(grammarUnit, 1);
    recognition.grammars = speechRecognitionList;
  }
  recognition.lang = 'ja';
  recognition.continuous = continuous;

  // console.log({ transcript, interimTranscript, finalTranscript });
  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          {isRecording ? (
            <Button
              size="large"
              onClick={(event) => {
                stopListening(event);
                setIsRecord(false);
              }}
              disabled={interimTranscript.length > 0}
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
        <Col span={8}>
          <Button
            size="large"
            onClick={dumpToContext}
            disabled={transcript.length === 0}
            block>
            Dump
          </Button>
        </Col>
        <Col span={8}>
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

      <Row gutter={8} style={{ marginTop: '8px' }}>
        <Col span={12}>
          <Button
            size="large"
            onClick={() => {
              if (!edit) {
                setEditMessage(context.join('\n'));
              } else {
                setContext(editMessage.split('\n'));
              }
              setEdit((prev) => !prev);
            }}
            disabled={context.length === 0 || isRecording}
            block>
            {edit ? 'Update' : 'Edit'}
          </Button>
        </Col>
        <Col span={12}>
          <Button
            size="large"
            onClick={() => handleSubmit(context)}
            disabled={context.length === 0 || isRecording}
            icon={<DownloadOutlined />}
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
        {edit ? (
          <TextArea
            autoSize
            value={editMessage}
            onChange={(event) => {
              setEditMessage(event.target.value);
            }}
          />
        ) : (
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
        )}
      </Row>
    </>
  );
};

export default SpeechRecognition({ autoStart: false })(Dictaphone);
