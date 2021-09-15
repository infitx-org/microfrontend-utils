import type { Options, Callback, Topic } from './types';

export default class PubSub {
  private topics: Record<string, Topic> = {};

  private static sendMessageEach(callbacks: Set<Callback>, message: string): void {
    callbacks.forEach((callback) => PubSub.sendMessage(callback, message));
  }

  private static sendMessage(callback: Callback, message: string): void {
    setTimeout(() => callback(message), 0);
  }

  private static runQueue(topic: Topic, callback: Callback): void {
    topic.messageQueue.forEach((queue) => {
      if (!queue.receivers.has(callback)) {
        PubSub.sendMessage(callback, queue.message);
      }
    });
  }

  subscribe(topicName: string, callback: Callback): () => void {
    const topic = this.getTopic(topicName);

    topic.callbacks.add(callback);

    PubSub.runQueue(topic, callback);

    return this.unsubscribe(topicName, callback);
  }

  dispatch(topicName: string, message: string, options?: Options): void {
    const { callbacks, messageQueue } = this.getTopic(topicName);

    PubSub.sendMessageEach(callbacks, message);

    if (options?.persist) {
      const queue = {
        message,
        receivers: new Set(callbacks),
      };
      messageQueue.add(queue);
      setTimeout(() => messageQueue.delete(queue), options.persist);
    }
  }

  private unsubscribe(topic: string, callback: Callback): () => void {
    const { callbacks } = this.topics[topic];
    return function unregister() {
      callbacks.delete(callback);
    };
  }

  private getTopic(topicName: string): Topic {
    if (!this.topics[topicName]) {
      this.topics[topicName] = {
        callbacks: new Set(),
        messageQueue: new Set(),
      };
    }
    return this.topics[topicName];
  }
}
