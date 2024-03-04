const jsc = require('jsverify');

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

const testDepthFirstSearch = () => {
    const graph = {
        1: [2, 3],
        2: [1, 4],
        3: [1, 5],
        4: [2, 6],
        5: [3, 7],
        6: [4],
        7: [5]
    };

    const test =
        jsc.forall(jsc.integer(1, 7), jsc.integer(1, 7), function(startNode, targetNode) {
            const path = depthFirstSearch(graph, startNode, targetNode);
            if (path.length === 0) {
                // If no path found, return true if startNode and targetNode are not connected
                return !graph[startNode] || !graph[targetNode];
            } else {
                // If path found, check if it's valid
                return path[0] === startNode && path[path.length - 1] === targetNode &&
                    path.every((node, index) => index === 0 || graph[node].includes(path[index - 1]));
            }
        });

    jsc.assert(test, { tests: 1000 });
};

testDepthFirstSearch();
