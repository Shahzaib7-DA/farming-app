import React from "react";
import { FiMic } from "react-icons/fi";



export function useVoiceInput({ onResult, disabled }: { onResult: (text: string) => void; disabled?: boolean }) {
  const recognitionRef = React.useRef<any>(null);
  const [listening, setListening] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Voice recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-IN';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;
  recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };
    recognitionRef.current.onerror = (event: any) => {
      setError(event.error || 'Voice recognition error');
      setListening(false);
    };
    recognitionRef.current.onend = () => setListening(false);
    // eslint-disable-next-line
  }, []);

  const start = React.useCallback(() => {
    setError(null);
    if (recognitionRef.current && !disabled) {
      setListening(true);
      recognitionRef.current.start();
    }
  }, [disabled]);

  const stop = React.useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  }, []);

  return { start, stop, listening, error };
}

export function VoiceButton({ onResult, disabled }: { onResult: (text: string) => void; disabled?: boolean }) {
  const { start, stop, listening, error } = useVoiceInput({ onResult, disabled });
  return (
    <>
      <button
        type="button"
        className={`bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 text-xl focus:outline-none disabled:opacity-50 ${listening ? 'animate-pulse' : ''}`}
        onClick={listening ? stop : start}
        disabled={disabled}
        aria-label={listening ? 'Stop voice input' : 'Start voice input'}
        title={listening ? 'Stop voice input' : 'Speak your query'}
      >
        <FiMic />
      </button>
      {error && (
        <span className="text-xs text-red-500 ml-2">{error}</span>
      )}
    </>
  );
}
