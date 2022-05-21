def NS(V,E,S):
    return {v for u in S for v in V if (u,v) in E}

def process(vertex):
    print("processing:", vertex)

def bfs(V,E,u, process):
    D_0 = {u}
    V_unexplored = V - {u}
    process(u)
    def bfsR(V, E, D_i):
        V_unexplored = V - D_i
        if len(V_unexplored) == 0:
            return
        D_new = NS(V_unexplored, E, D_i)

        # process vertex
        for v in D_new:
            process(v)

        bfsR(V_unexplored, E, D_new)

    bfsR(V_unexplored, E,D_0)

V = {"A", "B", "C", "D", "E"}
E = { 
    ("A","B"),("B","A"),
    ("A","C"),("C","A"),
    ("B","C"),("C","B"),
    ("B","D"),("D","B"),
    ("D","E"),("E","D") 
    }

bfs(V,E, "D", process)
"""
processing: D
processing: E
processing: B
processing: C
processing: A
"""