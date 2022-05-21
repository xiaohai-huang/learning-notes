city_to_city = [
    ("Brisbane", "Sydney"),
    ("Vancouver", "London"),
    ("Paris","Brisbane"),
    ("Paris", "Vancouver"),
    ("Sydney","Paris")
]
class SPP:
    def __init__(self, G) -> None:
        self.V, self.E = G

    def get_shortest_path(self, start, end):
        parents = spanTree(self.V, self.E, start)
        return path(parents, end)

class TTP:
    def __init__(self, city_to_city) -> None:
        self.G = TTP.build_graph(city_to_city)
        self.spp = SPP(self.G)

    def build_graph(l):
        V = set()
        E = set()
        for u,v in l:
            V.add(u)
            V.add(v)
            E.add((u,v))
            E.add((v,u))
        return V,E

    def get_shortest_path_between(self,city1, city2):
        return self.spp.get_shortest_path(city1, city2)

def N(V, E, u):
    """Find all the neighbors of the vertex"""
    return {v for v in V if (u,v) in E}

def NS(V,E,S):
    """Find all the neighbors of a set of vertices"""
    return {v for u in S for v in V if (u,v) in E}

def pickOne(S:set):
    """Pick one element from the set"""
    return next(iter(S))

def spanTree(V,E, root):
    parents = {root:None}
    spanTreeR(V - {root}, E, {root}, parents)
    return parents

def spanTreeR(V, E, D, parents):
    Dnew = NS(V, E, D)
    if len(Dnew) == 0:
        return
    for v in Dnew:
        parents[v] = pickOne(N(D,E,v))
    spanTreeR(V - Dnew, E, Dnew, parents)

def path(parents, destination):
    p = parents[destination]
    if p == None: return [destination]

    return path(parents, p) + [destination]


#  from Brisbane to London


# Use BFS to build a spanning tree which pick Brisbane as the root.
# parents = spanTree(*build_graph(city_to_city), "Brisbane")
# print(parents)
# # given a parents (spanning tree) find the path from Brisbane to London 

# paths = path(parents,"London")
# print(paths)

ttp = TTP(city_to_city)
print(ttp.get_shortest_path_between("Brisbane", "London"))
print(ttp.get_shortest_path_between("London", "Brisbane"))
print(ttp.get_shortest_path_between("Paris", "London"))

