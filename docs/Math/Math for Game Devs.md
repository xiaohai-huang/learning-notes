# Spaces & Cross Product

## Spaces

- World Space
- Local Space

Every transform has their own local space.

Local space is just another __coordinate system__.

Basis vectors usually have a unit of 1.

### Space Transform

Below shows how to transform a point between different spaces.

```csharp
public Vector2 WorldSpacePoint;
public Vector2 LocalSpacePoint;
private void OnDrawGizmos()
{
    Vector2 position = transform.position;
    Vector2 up = transform.up;
    Vector2 right = transform.right;


    Vector2 LocalToWorld(Vector2 localSpacePoint, Vector2 up, Vector2 right)
    {
        return position + (right * localSpacePoint.x + up * localSpacePoint.y);
    }
    
    Vector2 WorldToLocal(Vector2 worldSpacePoint, Vector2 up, Vector2 right)
    {
        Vector2 originToPoint = worldSpacePoint - position;
        float x = Vector2.Dot(originToPoint, right);
        float y = Vector2.Dot(originToPoint, up);
        return new Vector2(x,y);
    }

    Gizmos.DrawSphere(LocalToWorld(LocalSpacePoint, up, right), 0.1f);

    Vector2 localPoint = WorldToLocal(WorldSpacePoint, up, right);
    objTf.localPosition = localPoint;

    DrawBasisVector(position, up, right);
    DrawBasisVector(Vector2.zero, Vector2.up, Vector2.right);
}
```
## Matrix

Game engine uses a matrix to store rotation, scale and position of a `GameObject`'s `transform`.  _see 1:52:00 of the [video](https://www.youtube.com/watch?v=XiwEyopOMqg)._

We can use matrix to transform vector from local space to world space or vice versa.

## Cross Product

The cross product of two vectors is a __vector__ that is perpendicular to the two input vectors.

[Cross product visualization](https://twitter.com/i/status/1203059678705602562)

In Unity, the __direction__ of the cross product is determined by the left hand rule. 

- 👍 Thumb finger - `x`
- 👆 Index finger - `y`
- 🖕 Middle finger - `z`

The __magnitude__ of the resultant vector is the area of the __parallelogram__ determiend by the two input vectors.

![Cross product magnitude](https://qph.cf2.quoracdn.net/main-qimg-7a2c62bc858f9dc24b31b43477c69632)

:::info

Use cases:

- Place items on terrain.


:::
## References

- [Spaces & Cross Product • Math for Game Devs [Part 2]](https://www.youtube.com/watch?v=XiwEyopOMqg)