export type Message = {
  topic: string;
  payload: string;
  date: Date;
};

export type Options = {
  persist: number;
};

export type MessageQueue = {
  receivers: Set<Callback>;
  message: Message;
};

export type Topic = {
  callbacks: Set<Callback>;
  messageQueue: Set<MessageQueue>;
};

export type Callback = (message: Message) => void;
