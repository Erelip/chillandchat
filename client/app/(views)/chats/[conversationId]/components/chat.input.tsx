export function ChatInput({
  value,
  typingUsersCount,
  onChange,
  onSend,
}: {
  value: string;
  typingUsersCount: number;
  onChange: (value: string) => void;
  onSend: () => void;
}) {
  return (
    <>
      {typingUsersCount > 0 && (
        <div className="px-4 py-1 text-sm text-gray-500">
          Someone is typing...
        </div>
      )}

      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-3 rounded-full border bg-gray-50 px-4 py-2 focus-within:ring-2 focus-within:ring-black/10">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Écrivez un message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend();
            }}
            className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-400"
          />

          <button
            onClick={onSend}
            disabled={!value.trim()}
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Envoyer
          </button>
        </div>
      </div>
    </>
  );
}