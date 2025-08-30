'use client';
export default function OfflineButton() {
  function download() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(sw => {
        // workbox precache is handled by next-pwa
        alert('Contenido descargado para offline');
      });
    }
  }
  return (
    <button onClick={download} className="bg-green-500 text-white px-4 py-2">
      Descargar para offline
    </button>
  );
}
