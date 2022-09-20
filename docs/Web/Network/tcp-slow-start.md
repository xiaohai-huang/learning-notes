---
sidebar_label: TCP Slow Start
description: Notes about TCP slow start and congestion control.
---

# TCP Slow Start / 14KB Rule

The first response packet will be **14KB**. This is part of TCP slow start, an algorithm which balances the speed of a network connection. Slow start gradually increases the amount of data transmitted until the network's maximum bandwidth can be determined.

In **TCP slow start**, after receipt of the initial packet, the server **doubles** the size of the next packet to around **28KB**. Subsequent packets increase in size until a predetermined threshold is reached, or congestion is experienced.

![slow start](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work/congestioncontrol.jpg)

:::info

TCP slow start gradually builds up transmission speeds appropriate for the network's capabilities to avoid **congestion**.

:::

## Congestion Control

As the server sends data in TCP packets, the client confirms delivery by returning acknowledgements (`ACKs`). However, the connection has a **limited capacity** depending on the hardware and network conditions.

If the server sends too many packets too quickly, they will be dropped. Meaning that there will be no acknowledgement (`ACK`). The server registers this as missing `ACKs`. Congestion control algorithms use this flow of sent packets and `ACKs` to determine a send rate.

## References

- [TCP Slow Start / 14KB rule](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#tcp_slow_start_14kb_rule)
- [TCP Slow Start](https://developer.mozilla.org/en-US/docs/Glossary/TCP_slow_start)
