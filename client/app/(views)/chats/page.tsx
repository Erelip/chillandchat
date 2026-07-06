export default function ChatsPage() {
  return (
    <div className="flex h-full flex-1 items-center justify-center bg-repeat"
        style={{
          backgroundImage: "url('/chat-bg.png')",
          backgroundSize: '420px',
        }}>
      
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 flex h-40 w-40 items-center justify-center">
          <img
            src="/cc_b.png"
            alt="Chillandchat logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="mb-6 flex items-center justify-center">
          <img
            src="/chillandchat.png"
            alt="Chillandchat"
            className="h-18 object-contain"
          />
        </div>

        <p className="max-w-md text-gray-500">
          Fast, simple, and messaging app.
        </p>
      </div>
    </div>
  );
}