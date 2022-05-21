def dfs(V,E,u):
    T = {u}
    dfsR(V,E,u, T)

def dfsR(V,E,u,T):
    print(u) # process vertex
    if len(T) == len(V):
        return T
    N_u = N(V,E,u) - T # neighbors of u that not already seen
    T.update(N_u)
    for v in N_u:
        T.update(dfsR(V,E,v,T))
    return T

def N(V,E,u):
    return {v for v in V if (u,v) in E}

V = {"A", "B", "C", "D", "E"}
E = { 
    ("A","B"),("B","A"),
    ("A","C"),("C","A"),
    ("B","C"),("C","B"),
    ("B","D"),("D","B"),
    ("D","E"),("E","D") 
    }
dfs(V,E,"A")