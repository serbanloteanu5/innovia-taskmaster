/* 
   filename: sophisticated_code.js
   content: This code implements a complex and sophisticated algorithm for finding the shortest path in a weighted graph using Dijkstra's algorithm and displays the result.
*/

class Graph {
  constructor() {
    this.nodes = [];
    this.edges = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = {};
  }

  addEdge(node1, node2, weight) {
    this.edges[node1][node2] = weight;
    this.edges[node2][node1] = weight;
  }

  dijkstra(startNode) {
    const distances = {};
    const visited = {};
    const previous = {};
    const queue = new PriorityQueue();

    for (let node of this.nodes) {
      if (node === startNode) {
        distances[node] = 0;
        queue.enqueue(node, 0);
      } else {
        distances[node] = Infinity;
        queue.enqueue(node, Infinity);
      }
      previous[node] = null;
    }

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue().data;
      visited[currentNode] = true;

      for (let neighbor in this.edges[currentNode]) {
        const distance = this.edges[currentNode][neighbor];
        const newPathDistance = distances[currentNode] + distance;

        if (newPathDistance < distances[neighbor]) {
          distances[neighbor] = newPathDistance;
          previous[neighbor] = currentNode;

          if (!visited[neighbor]) {
            queue.enqueue(neighbor, newPathDistance);
          }
        }
      }
    }

    return { distances, previous };
  }

  getPath(startNode, endNode, previous) {
    const path = [];
    let currentNode = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }

    if (path[0] === startNode) {
      return path;
    } else {
      return [];
    }
  }
}

class PriorityQueue {
  constructor() {
    this.data = [];
  }

  enqueue(item, priority) {
    this.data.push({ item, priority });
    this.data.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.data.shift();
  }

  isEmpty() {
    return this.data.length === 0;
  }
}

// Example usage

const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

const startNode = "A";
const endNode = "E";

const { distances, previous } = graph.dijkstra(startNode);
const shortestPath = graph.getPath(startNode, endNode, previous);

console.log("Shortest Path:", shortestPath.join(" -> "));
console.log("Distances:", distances);

// More complex and creative code could be written based on specific requirements and use cases.