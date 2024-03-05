const jsc = require('jsverify');


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

};

testDepthFirstSearch();
