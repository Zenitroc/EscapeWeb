import RoomChat from '@/components/RoomChat';

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-8">
      <h1>Sala {params.id}</h1>
      <RoomChat roomId={params.id} />
    </main>
  );
}
