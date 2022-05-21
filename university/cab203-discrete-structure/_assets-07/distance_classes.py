def distance_classes(V:set, E:set, u):
    """
    V: a set of vertices.
    E: a set of edges.
    u: the starting vertex.

    return: A list D. The vertices in D[1] is 1 distance from u.
    """
    D = [{u}]
    V_unexplored = V - {u}

    return distance_classesR(V_unexplored, E, D)

def distance_classesR(V,E, D):
    V_unexplored = V - D[-1]
    if len(V_unexplored) == 0:
        return D
    D_new = NS(V_unexplored, E, D[-1])
    D = D + [D_new]
    return distance_classesR(V_unexplored, E, D)

def NS(V,E,S):
    return {v for u in S for v in V if (u,v) in E}

V = {"A", "B", "C", "D", "E"}
E = { 
    ("A","B"),("B","A"),
    ("A","C"),("C","A"),
    ("B","C"),("C","B"),
    ("B","D"),("D","B"),
    ("D","E"),("E","D") 
    }
print(distance_classes(V,E, "A"))
# [{'A'}, {'C', 'B'}, {'D'}, {'E'}]
