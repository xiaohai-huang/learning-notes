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

## Request and Response Multiplexing

With HTTP/1.1, if the client wants to make multiple parallel requests to improve performance, then **multiple TCP connections** must be used.

## Stream Prioritization

## Server Push

## Header Compression

## References

- [HTTP 2 | High Performance Browser Networking](https://hpbn.co/http2/)
