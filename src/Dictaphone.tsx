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
  resetTranscript: any;
  listening: boolean;
  browserSupportsSpeechRecognition?: boolean;
  recognition?: any;
}

const Dictaphone: React.FunctionComponent<Props> = ({
  speaker,
  continuous = true,
  handleSubmit,
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
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [context, setContext] = useState<string[]>([]);
  const { Paragraph, Text } = Typography;
  const { TextArea } = Input;

  if (!isBrowserSupported) {
    return <Paragraph>Your browser does not support.</Paragraph>;
  }

  useEffect(() => {
    if (transcript !== '' && interimTranscript === '') {
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
    }
  }, [interimTranscript]);

  useEffect(() => {}, [isRecording]);

  recognition.lang = 'ja';
  recognition.continuous = continuous;

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
            onClick={() => handleSubmit(context)}
            disabled={context.length === 0}
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
            // onPressEnter={(event) => {
            //   console.log({ ...event });
            // }}
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
      {context.length > 0 && (
        <Row style={{ marginTop: '8px' }}>
          <Col span={24}>
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
              disabled={isRecording}
              icon={<DownloadOutlined />}
              block>
              {edit ? 'Update' : 'Edit'}
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SpeechRecognition({ autoStart: false })(Dictaphone);
