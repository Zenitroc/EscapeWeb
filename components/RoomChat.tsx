'use client';
import { useEffect, useState } from 'react';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RoomChat({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<{ id: number; content: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const channel: RealtimeChannel = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, payload => {
        setMessages((m) => [...m, payload.new as any]);
      })
      .subscribe();
    return () => { channel.unsubscribe(); };
  }, [roomId]);

  async function send() {
    await supabase.from('messages').insert({ room_id: roomId, content: input });
    setInput('');
  }

  return (
    <div className="space-y-2">
      <div className="border h-40 overflow-y-auto p-2">
        {messages.map((m) => (
          <div key={m.id}>{m.content}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} className="border p-1 w-full" />
      <button onClick={send} className="bg-blue-500 text-white px-2 py-1">Enviar</button>
    </div>
  );
}
