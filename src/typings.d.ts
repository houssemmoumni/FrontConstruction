declare module 'sockjs-client' {
    const SockJS: {
      new(url: string): WebSocket;
      prototype: WebSocket;
    };
    export default SockJS;
  }

  declare var global: typeof globalThis;
