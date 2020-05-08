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

  if (!isBrowserSupported) {
    return null;
  }

  return (
    <div>
      <button onClick={resetTranscript}>Reset</button>
      <span>{transcript}</span>
    </div>
  );
};

export default SpeechRecognition(Dictaphone);
