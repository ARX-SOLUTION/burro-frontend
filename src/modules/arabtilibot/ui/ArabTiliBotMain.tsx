import { useState } from 'react';

import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { usePageMetadata } from '@/libs/usePageMetadata';

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold">Burro</h1>
        <div className="mb-6 flex h-64 flex-col items-center overflow-y-auto rounded border border-gray-200 bg-gray-50 p-2 px-1">
          <p className="max-w-xs text-center text-md leading-7 text-gray-500">
            Arab tilini noldan boshlab, oson va qiziqarli o&apos;rganing.
          </p>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === 'bot'
                  ? 'rounded bg-blue-50 p-2 text-left text-blue-700'
                  : 'rounded bg-gray-100 p-2 text-right text-gray-800'
              }
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Input
            value={input}
            onChange={(v: string) => handleInputChange(v)}
            placeholder="Savolingizni yozing..."
            size="md"
            className="flex-1"
          />
          <div className="pt-2">
            <Button
              className="w-full rounded-[12px] bg-[#0D9488] py-4 text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
              onClick={handleSend}
              isDisabled={!input.trim()}
            >
              Boshlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
