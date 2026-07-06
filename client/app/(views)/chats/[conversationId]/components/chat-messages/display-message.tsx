import { Message, Participant, User } from "@/app/dto/conversation";

export function MessageGroup({
  message,
  me,
  sender,
}: {
  message: Message;
  me?: User;
  sender?: Participant;
}) {
  const isMine = message.senderId === me?.id;

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && (
        <div className="mr-3 mt-5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
          {sender?.user.avatar ? (
            <img
              src={sender.user.avatar}
              alt={`${sender.user.firstname} ${sender.user.lastname}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-semibold text-gray-700">
              {sender?.user.firstname.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      )}

      <div className={`flex max-w-[70%] flex-col ${isMine ? 'items-end' : 'items-start'}`}>
        {!isMine && (
          <span className="mb-1 text-xs font-medium text-gray-500">
            {sender?.user.firstname} {sender?.user.lastname}
          </span>
        )}

        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${
            isMine
              ? 'rounded-br-md bg-blue-500 text-white'
              : 'rounded-bl-md bg-white text-gray-800'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}

export function MessageDirect({
  message,
  me,
}: {
  message: Message;
  me?: User;
}) {
  const isMine = message.senderId === me?.id;

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[70%] flex-col ${isMine ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${
            isMine
              ? 'rounded-br-md bg-blue-500 text-white'
              : 'rounded-bl-md bg-white text-gray-800'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}