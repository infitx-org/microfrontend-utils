export type Options = {
  persist: number;
};

export type MessageQueue = {
  receivers: Set<Callback>;
  message: string;
};

export type Topic = {
  callbacks: Set<Callback>;
  messageQueue: Set<MessageQueue>;
};

export type Callback = (message: string) => void;
