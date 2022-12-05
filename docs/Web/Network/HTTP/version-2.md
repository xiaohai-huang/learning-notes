# HTTP 2

> HTTP/2 can make our applications faster, simpler, and more robust.

## Goals

The primary goals for HTTP/2 are to:

- 🔄 Reduce latency by enabling full request and response **multiplexing**.
- 🗜️ Minimize protocol overhead via efficient **compression of HTTP header fields**.
- 🚑️ Request **prioritization**
- 🌐 **Server push**

:::note

HTTP/2 does not modify the application semantics of HTTP in any way.
All the core concepts, such as HTTP methods, status codes, URIs, and header fields, remain in place.

🎞️ Instead, HTTP/2 modifies how the data is formatted and transported between the client and server. New **Binary Framing Layer**

:::

## Binary Framing Layer

## 🔄 Request and Response Multiplexing

With HTTP/1.1, if the client wants to make multiple parallel requests to improve performance, then **multiple TCP connections** must be used. This workaround was applied because of the HTTP/1.1 delivery model 🚚, which ensures that only one response can be delivered at a time ([response queuing](version-1.1.md) [🚶🚶🚶🚶]) per connection. This delivery model also results in 🚧 [**head-of-line blocking**](version-1.1.md) and **inefficient** use of the underlying TCP connection (cuz **multiple** connections are used).

🎞️ The **new binary framing layer** in HTTP/2 removes these limitations 💩, and enables full request and response multiplexing, by allowing the client and server to:

1. ✂️ break down an HTTP [message](#binary-framing-layer) into independent frames
2. interleave them
3. 🗃️ reassemble them on the other end

:::note

![request and response multiplexing](https://hpbn.co/assets/diagrams/47ba5b32e42cf5a06c3741d29ef9b94a.svg)

The above image captures multiple [**streams**](#binary-framing-layer) within the same connection:

- The client is transmitting a **DATA** frame to the server
- The server is transmitting an interleaved sequence of frames to the client.

:::

## 🚑️ Stream Prioritization

## 🌐 Server Push

## 🗜️ Header Compression

## References

- [HTTP 2 | High Performance Browser Networking](https://hpbn.co/http2/)
