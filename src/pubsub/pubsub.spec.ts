import PubSub from './pubsub';

describe('tests the pubsub', () => {
  it('should create the instance', () => {
    const p = new PubSub();

    expect(p).toBeInstanceOf(PubSub);
  });
});
