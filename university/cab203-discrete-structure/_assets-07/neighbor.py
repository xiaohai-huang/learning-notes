def N(G, u):
    """
    Get the neighbors of a vertex.
    G: a graph (V, E)
    u: a vertex
    """
    V, E = G
    return {v for v in V if (u, v) in E}

def NS(G, S):
    """
    Get the neighbors of a set of vertices.
    G: a graph (V, E)
    S: a set of vertices
    """
    neighbors = set()
    for u in S:
        neighbors = neighbors.union(N(G, u))
    return neighbors

def NS_2(G, S):
    V, E = G
    return {v for v in V for u in S if (u,v) in E}
# the graph from the visualization section
V = {"A", "B", "C", "D", "E"}
E = { 
    ("A","B"),("B","A"),
    ("A","C"),("C","A"),
    ("B","C"),("C","B"),
    ("B","D"),("D","B"),
    ("D","E"),("E","D") 
    }
G = (V, E)

print("Vertices:", V)
print("Edges:", E)
print("Neighbors of A:", N(G, "A"))
print("Neighbors of {A, D}:", NS(G, {"A","D"}))

"""
Vertices: {'D', 'C', 'E', 'A', 'B'}
Edges: {('C', 'B'), ('E', 'D'), ('C', 'A'), ('D', 'E'), ('B', 'A'), ('B', 'C'), ('D', 'B'), ('B', 'D'), ('A', 'C'), ('A', 'B')}
Neighbors of A: {'B', 'C'}
Neighbors of {A, D}: {'B', 'C', 'E'}
"""