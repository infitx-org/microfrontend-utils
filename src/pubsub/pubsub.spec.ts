import PubSub from './pubsub';

describe('tests the pubsub', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create the instance', () => {
    const pubsub = new PubSub();

    expect(pubsub).toBeInstanceOf(PubSub);
    expect(pubsub.dispatch).toBeInstanceOf(Function);
    expect(pubsub.subscribe).toBeInstanceOf(Function);
  });

  it('should subscribe and get the unsubscribe return function', () => {
    const pubsub = new PubSub();
    const unsubscribe = pubsub.subscribe('topic', jest.fn());
    expect(unsubscribe).toBeInstanceOf(Function);
  });

  it('calls the subscription callback once', () => {
    const pubsub = new PubSub();
    pubsub.subscribe('topic', jest.fn());
    pubsub.dispatch('topic', 'message');
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
  });

  it('calls the subscription callback twice', () => {
    const pubsub = new PubSub();
    pubsub.subscribe('topic', jest.fn());
    pubsub.subscribe('topic', jest.fn());
    pubsub.dispatch('topic', 'message');
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
  });

  it('receives the message in the topic', () => {
    const pubsub = new PubSub();
    const mockHandleMessage = jest.fn();
    pubsub.subscribe('topic', mockHandleMessage);
    pubsub.dispatch('topic', 'message');
    jest.runAllTimers();
    expect(mockHandleMessage).toHaveBeenCalled();
    expect(mockHandleMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        topic: 'topic',
        payload: 'message',
        date: expect.any(Date),
      })
    );
  });

  it('persists the message in the topic queue and deliver on a subscription happening before the expiration', () => {
    const pubsub = new PubSub();
    const mockHandleMessage = jest.fn();

    pubsub.dispatch('topic', 'message', { persist: 3000 });
    jest.advanceTimersByTime(1000);

    pubsub.subscribe('topic', mockHandleMessage);
    expect(mockHandleMessage).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(mockHandleMessage).toHaveBeenCalled();
    expect(mockHandleMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        topic: 'topic',
        payload: 'message',
        date: expect.any(Date),
      })
    );
  });

  it('persists the message in the topic queue and do not deliver on a subscription happening after the expiration', () => {
    const pubsub = new PubSub();
    const mockHandleMessage = jest.fn();

    pubsub.dispatch('topic', 'message', { persist: 3000 });
    jest.advanceTimersByTime(4000);

    pubsub.subscribe('topic', mockHandleMessage);
    expect(mockHandleMessage).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(mockHandleMessage).not.toHaveBeenCalled();
  });
});
