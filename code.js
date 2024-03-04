function depthFirstSearch(graph, startNode, targetNode, visited = []) {
    visited.push(startNode);

    if (startNode === targetNode) {
        return [startNode];
    }

    for (var i = 0; i < graph[startNode].length; i++) {
        if (!visited.includes(graph[startNode][i])) {
            var path = depthFirstSearch(graph, graph[startNode][i], targetNode, visited.slice());
            if (path.length > 0) {
                return [startNode].concat(path);
            }
        }
    }

    return [];
}
