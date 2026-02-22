import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { usePageMetadata } from '@/libs/usePageMetadata';
import { useState } from 'react';

export const ArabTiliBotMain = () => {
  usePageMetadata({ title: 'Arab tili bot' });

  type Message = { sender: 'user' | 'bot'; text: string };
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Salom! Arab tili bo‘yicha savollaringizni yozing.' },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    // TODO: Integrate bot API
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center">Arab tili bot</h1>
        <div className="flex flex-col gap-2 mb-4 h-64 overflow-y-auto bg-gray-50 rounded border border-gray-200 p-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === 'bot'
                  ? 'text-left text-blue-700 bg-blue-50 rounded p-2'
                  : 'text-right text-gray-800 bg-gray-100 rounded p-2'
              }
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(v: string) => handleInputChange(v)}
            placeholder="Savolingizni yozing..."
            size="md"
            className="flex-1"
          />
          <Button color="primary" size="md" onClick={handleSend} isDisabled={!input.trim()}>
            Yuborish
          </Button>
        </div>
      </div>
    </div>
  );
};
